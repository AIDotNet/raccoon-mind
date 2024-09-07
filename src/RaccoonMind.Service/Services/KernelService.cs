using System.Collections.Concurrent;
using Microsoft.SemanticKernel;
using RaccoonMind.Application.Options;

namespace RaccoonMind.Application.Services;

public class KernelService
{
    private readonly ConcurrentDictionary<string, Lazy<Kernel>> _kernels = new();

    public Kernel GetKernel(string name)
    {
        return _kernels.GetOrAdd(name, _ => new Lazy<Kernel>(CreateKernel)).Value;
    }

    private Kernel CreateKernel()
    {
        var httpClient = new HttpClient(new OpenAIHttpClientHandler());

        var builder = Kernel.CreateBuilder()
            .AddOpenAIChatCompletion(OpenAIOptions.Model, OpenAIOptions.ApiKey, httpClient: httpClient);

        var path = Path.Combine(AppContext.BaseDirectory, "plugins", "BasePlugins");

        builder.Plugins.AddFromPromptDirectory(path, "BasePlugins");

        return builder.Build();
    }
}