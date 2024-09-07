using System.Text;
using System.Text.Json;
using Microsoft.SemanticKernel;
using RaccoonMind.Application.Dto;

namespace RaccoonMind.Application.Services;

public class MindMapService(ILogger<MindMapService> logger)
{
    private const string DataTextTemplate =
        "data: {0}\n\n";

    private static readonly JsonSerializerOptions JsonSerializerOptions = new()
    {
        PropertyNamingPolicy = JsonNamingPolicy.CamelCase
    };

    public async Task MiniStreamAsync(HttpContext context, KernelService kernelService, MiniStreamInput input)
    {
        var token = context.Request.Headers.Authorization.ToString()
            .Replace("Bearer ", "");

        OpenAIHttpClientHandler.Token.Value = token;

        var kernel = kernelService.GetKernel(nameof(MiniStreamAsync));

        context.Response.Headers.ContentType = "text/event-stream";

        logger.LogInformation("MiniStreamAsync");

        var plugins = kernel.Plugins["BasePlugins"];

        var str = input.Messages.Select(x => "角色：" + x.Role + Environment.NewLine + " 输出：" + x.Content)
            .ToArray();

        var message = new StringBuilder();

        await foreach (var item in kernel.InvokeStreamingAsync(plugins["Minid"], new KernelArguments()
                       {
                           ["demand"] = string.Join(Environment.NewLine, str)
                       }))
        {
            message.Append(item);
            await context.Response.WriteAsync(string.Format(DataTextTemplate, JsonSerializer.Serialize(new MindDto()
            {
                Content = item.ToString(),
                Type = "text"
            }, JsonSerializerOptions)));
        }

        logger.LogInformation("MiniStreamAsync Message: {0}", message);

        logger.LogInformation("MiniStreamAsync End");
    }

    /// <summary>
    /// 传递模型
    /// </summary>
    public sealed class MindDto
    {
        public string Content { get; set; }

        public string Type { get; set; }
    }
}