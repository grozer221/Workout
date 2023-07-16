using Geesemon.Web.Extensions;

using GraphQL;
using GraphQL.Types;

using Microsoft.Net.Http.Headers;

using WorkoutApp.WebServer.Business;
using WorkoutApp.WebServer.DataAccess;
using WorkoutApp.WebServer.Extensions;
using WorkoutApp.WebServer.Services;

namespace WorkoutApp.WebServer.GraphApi.Modules.Auth
{
    public class AuthMutation : ObjectGraphType
    {
        public AuthMutation(
            AuthService authService,
            UserRepository userRepository,
            SessionRepository sessionRepository,
            IHttpContextAccessor httpContextAccessor)
        {
            Field<NonNullGraphType<AuthResponseType>, AuthResponse>()
                .Name("Register")
                .Argument<NonNullGraphType<AuthRegisterInputType>, AuthRegisterInput>("input", "Argument to register new User")
                .ResolveAsync(async context =>
                {
                    var authRegisterInput = context.GetAndValidateArgument<AuthRegisterInput>("input");

                    var user = await userRepository.GetByEmailAsync(authRegisterInput.Email);

                    if (user != null)
                        throw new Exception($"User with email '{authRegisterInput.Email}' already exist.");

                    var userId = Guid.NewGuid();
                    var saltedPassword = authRegisterInput.Password + userId;
                    var newUser = await userRepository.CreateAsync(new User
                    {
                        Id = userId,
                        Email = authRegisterInput.Email,
                        Password = saltedPassword.CreateMD5(),
                        FirstName = authRegisterInput.FirstName,
                        LastName = authRegisterInput.LastName,
                    });

                    var session = await sessionRepository.CreateAsync(new Session
                    {
                        Token = authService.GenerateAccessToken(newUser.Id),
                        UserId = newUser.Id,
                    });

                    return new AuthResponse()
                    {
                        Token = session.Token,
                        User = newUser,
                    };
                });

            Field<NonNullGraphType<AuthResponseType>, AuthResponse>()
                .Name("Login")
                .Argument<NonNullGraphType<AuthLoginInputType>, AuthLoginInput>("input", "Argument to login User")
                .ResolveAsync(async context =>
                {
                    var authLoginInput = context.GetAndValidateArgument<AuthLoginInput>("input");

                    var user = await userRepository.GetByEmailAsync(authLoginInput.Email);
                    if (user == null)
                        throw new Exception("Email or password not valid.");

                    var saltedPassword = authLoginInput.Password + user.Id;
                    if (user.Password != saltedPassword.CreateMD5())
                        throw new Exception("Email or password not valid.");

                    var session = await sessionRepository.CreateAsync(new Session
                    {
                        Token = authService.GenerateAccessToken(user.Id),
                        UserId = user.Id,
                    });

                    return new AuthResponse()
                    {
                        Token = session.Token,
                        User = user,
                    };
                });

            Field<NonNullGraphType<BooleanGraphType>, bool>()
                .Name("Logout")
                .ResolveAsync(async context =>
                {
                    var userId = httpContextAccessor.HttpContext.User.Claims.GetUserId();
                    var token = httpContextAccessor.HttpContext.Request.Headers[HeaderNames.Authorization];
                    await sessionRepository.RemoveAsync(userId, token);
                    return true;
                })
                .AuthorizeWith(AuthPolicies.Authenticated);

            //Field<NonNullGraphType<SessionType>, Session>()
            //    .Name("TerminateSession")
            //    .Argument<NonNullGraphType<GuidGraphType>, Guid>("SessionId", "")
            //    .ResolveAsync(async context =>
            //    {
            //        var sessionId = context.GetAndValidateArgument<Guid>("SessionId");
            //        var session = await sessionRepository.GetByIdAsync(sessionId);
            //        var userId = httpContextAccessor.HttpContext.User.Claims.GetUserId();
            //        if (session.UserId != userId)
            //            throw new ExecutionError("You can not remove others sessions");
            //        return await sessionRepository.RemoveAsync(session);
            //    })
            //    .AuthorizeWith(AuthPolicies.Authenticated);

            //Field<NonNullGraphType<ListGraphType<SessionType>>, IEnumerable<Session>>()
            //    .Name("TerminateAllOtherSessions")
            //    .ResolveAsync(async context =>
            //    {
            //        var userId = httpContextAccessor.HttpContext.User.Claims.GetUserId();
            //        string token = httpContextAccessor.HttpContext.Request.Headers[HeaderNames.Authorization];
            //        return await sessionRepository.TerminateAllOthersSessionAsync(userId, token);
            //    })
            //    .AuthorizeWith(AuthPolicies.Authenticated);

            //Field<NonNullGraphType<UserType>, User>()
            //    .Name("UpdateProfile")
            //    .Argument<NonNullGraphType<AuthUpdateProfileType>, AuthUpdateProfile>("Input", "")
            //    .ResolveAsync(async context =>
            //    {
            //        var authUpdateProfile = context.GetAndValidateArgument<AuthUpdateProfile>("Input");
            //        await authUpdateProfileValidator.ValidateAndThrowAsync(authUpdateProfile);

            //        string imageUrl;
            //        if (authUpdateProfile.Image != null)
            //            imageUrl = await fileManagerService.UploadFileAsync(FileManagerConstants.UsersAvatarsFolder, authUpdateProfile.Image);
            //        else
            //            imageUrl = authUpdateProfile.ImageUrl;

            //        var currentUserId = httpContextAccessor.HttpContext.User.Claims.GetUserId();
            //        var currentUser = await userRepository.GetByIdAsync(currentUserId);
            //        currentUser.FirstName = authUpdateProfile.Firstname;
            //        currentUser.LastName = authUpdateProfile.Lastname;
            //        currentUser.Identifier = authUpdateProfile.Identifier;
            //        currentUser.ImageUrl = imageUrl;
            //        currentUser = await userRepository.UpdateAsync(currentUser);

            //        await chatActivitySubscriptionService.Notify(currentUser.Id);
            //        return currentUser;
            //    })
            //    .AuthorizeWith(AuthPolicies.Authenticated);

            //Field<NonNullGraphType<AuthGenerateLoginQrCodeType>, AuthGenerateLoginQrCode>()
            //    .Name("GenerateLoginQrCode")
            //    .ResolveAsync(async context =>
            //    {
            //        var token = authService.GenerateLoginToken();
            //        var json = string.Format(
            //            @"{{""data"":""{0}"",""config"":{{""body"":""round"",""eye"":""frame13"",""eyeBall"":""ball15"",""erf1"":[],""erf2"":[],""erf3"":[],""brf1"":[],""brf2"":[],""brf3"":[],""bodyColor"":""#000000"",""bgColor"":""#FFFFFF"",""eye1Color"":""#000000"",""eye2Color"":""#000000"",""eye3Color"":""#000000"",""eyeBall1Color"":""#000000"",""eyeBall2Color"":""#000000"",""eyeBall3Color"":""#000000"",""gradientColor1"":"""",""gradientColor2"":"""",""gradientType"":""linear"",""gradientOnEyes"":""true"",""logo"":""940099f5a274eb8c265745d4d4afe9c74786e7b1.svg"",""logoMode"":""clean""}},""size"":1000,""download"":""imageUrl"",""file"":""svg""}}",
            //            token);
            //        var data = new StringContent(json, Encoding.UTF8, "application/json");
            //        var response = await new HttpClient().PostAsync("https://api.qrcode-monkey.com//qr/custom", data);
            //        var generateQrCodeResponse = JsonConvert.DeserializeObject<GenerateQrCodeResponse>(await response.Content.ReadAsStringAsync());
            //        return new AuthGenerateLoginQrCode
            //        {
            //            QrCodeUrl = "https://" + generateQrCodeResponse.ImageUrl.Substring(2),
            //            Token = token,
            //        };
            //    });

            //Field<NonNullGraphType<AuthResponseType>, AuthResponse>()
            //    .Name("LoginViaToken")
            //    .Argument<NonNullGraphType<StringGraphType>>("token", "")
            //    .ResolveAsync(async context =>
            //    {
            //        var token = context.GetAndValidateArgument<string>("token");
            //        var result = authService.ValidateLoginToken(token);

            //        if (result == null)
            //            throw new ExecutionError("Token is not valid");

            //        var identifier = httpContextAccessor.HttpContext.User.Claims.GetIdentifier();
            //        var user = await userRepository.GetByIdentifierAsync(identifier);
            //        if (user == null)
            //            throw new Exception("User does not exists.");

            //        var session = new Session
            //        {
            //            Token = authService.GenerateAccessToken(user.Id, user.Identifier, user.Role),
            //            UserId = user.Id,
            //        };
            //        session = await authService.FillSession(session, true);
            //        session = await sessionRepository.CreateAsync(session);

            //        var authResponse = new AuthResponse()
            //        {
            //            Token = session.Token,
            //            User = user,
            //        };
            //        loginViaTokenSubscriptionService.Notify(new LoginViaToken
            //        {
            //            Token = token,
            //            AuthResponse = authResponse,
            //        });

            //        return authResponse;
            //    })
            //    .AuthorizeWith(AuthPolicies.Authenticated);
        }

        class GenerateQrCodeResponse
        {
            public string ImageUrl { get; set; }
        }
    }
}
