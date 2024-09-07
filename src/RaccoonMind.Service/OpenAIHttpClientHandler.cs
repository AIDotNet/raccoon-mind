using System.Net.Http.Headers;
using RaccoonMind.Application.Options;

namespace RaccoonMind.Application;

public sealed class OpenAIHttpClientHandler : HttpClientHandler
{
    /// <summary>
    /// 用于得到请求者提供的Token
    /// </summary>
    public static readonly AsyncLocal<string> Token = new();

    protected override async Task<HttpResponseMessage> SendAsync(HttpRequestMessage request,
        CancellationToken cancellationToken)
    {
        // 替换openai
        request.RequestUri =
            new Uri(request.RequestUri.ToString()
                .Replace("https://api.openai.com", OpenAIOptions.Endpoint.TrimEnd('/')));

        request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", Token.Value);
        var result = await base.SendAsync(request, cancellationToken);

        return result;
    }
}