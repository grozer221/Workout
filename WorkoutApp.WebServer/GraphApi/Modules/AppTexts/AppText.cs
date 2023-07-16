namespace WorkoutApp.WebServer.GraphApi.Modules.AppTexts;

public class AppText
{
    public AppText(KeyValuePair<string, string> keyValuePair)
    {
        this.Key = keyValuePair.Key;

        this.Value = keyValuePair.Value;
    }

    public AppText(string key, string value)
    {
        this.Key = key;

        this.Value = value;
    }

    public string Key { get; set; }

    public string Value { get; set; }
}
