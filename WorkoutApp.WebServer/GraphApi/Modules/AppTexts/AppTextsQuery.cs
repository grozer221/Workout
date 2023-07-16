using GraphQL.Types;

using WorkoutApp.WebServer.Services;

namespace WorkoutApp.WebServer.GraphApi.Modules.AppTexts
{
    public class AppTextsQuery : ObjectGraphType
    {
        public AppTextsQuery(IHttpContextAccessor httpContextAccessor, GeeseTextsAccessor geeseTextsAccessor)
        {
            Field<ListGraphType<AppTextType>, List<AppText>>()
                .Name("GetTexts")
                .Resolve(context =>
                {
                    if (!httpContextAccessor.HttpContext.Request.Cookies.TryGetValue("lang", out string? lang))
                        return geeseTextsAccessor.GetTexts(Language.EN);

                    if (Enum.TryParse<Language>(lang, true, out var language))
                        return geeseTextsAccessor.GetTexts(language);

                    return geeseTextsAccessor.GetTexts(Language.EN);
                });

            Field<ListGraphType<AppTextType>, List<AppText>>()
                .Name("GetLanguages")
                .Resolve(context => GeeseTextsAccessor.LanguagesTexts);
        }
    }
}
