using Newtonsoft.Json;

using WorkoutApp.WebServer.DataAnotations;
using WorkoutApp.WebServer.GraphApi.Modules.AppTexts;

namespace WorkoutApp.WebServer.Services;

[InjectableService]
public class GeeseTextsAccessor
{
    private Dictionary<Language, List<AppText>> appTexts = new Dictionary<Language, List<AppText>>();

    public GeeseTextsAccessor()
    {
        ParseTexts();
        FillMissingTexts();
    }

    public List<AppText> GetTexts(Language language)
    {
        return appTexts[language];
    }

    public string GetText(Language language, string textCode)
    {
        return appTexts[language].FirstOrDefault(t => t.Key == textCode)?.Value;
    }

    private void ParseTexts()
    {
        foreach (var lang in Enum.GetNames<Language>())
        {
            var textsJson = File.ReadAllText(@$".\AppTexts\AppTexts_{lang}.json");
            var texts = JsonConvert.DeserializeObject<Dictionary<string, string>>(textsJson);

            var appTexts = new List<AppText>();

            foreach (var text in texts)
                appTexts.Add(new AppText(text));

            this.appTexts.Add(Enum.Parse<Language>(lang), appTexts);
        }
    }

    private void FillMissingTexts()
    {
        foreach (var lang in Enum.GetNames<Language>())
        {
            if (lang == Language.EN.ToString())
                continue;

            foreach (var text in appTexts[Language.EN])
            {
                var langTexts = appTexts[Enum.Parse<Language>(lang)];
                if (langTexts != null && !langTexts.Any(t => t.Key == text.Key))
                {
                    langTexts.Add(text);
                }
            }
        }
    }

    public static List<AppText> LanguagesTexts = new List<AppText>
    {
       new AppText(Language.EN.ToString(), "English" ),
       new AppText(Language.UA.ToString(), "Українська" ),
    };
}
