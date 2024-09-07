using RaccoonMind.Application.Options;
using RaccoonMind.Application.Services;

namespace RaccoonMind.Application;

public static class RaccoonMindApplicationCollectionExtensions
{
    public static IServiceCollection AddRaccoonMindApplication(this IServiceCollection services,
        IConfiguration configuration)
    {
        services.AddScoped<KernelService>();
        services.AddScoped<MindMapService>();

        configuration.GetSection("OpenAI")
            .Get<OpenAIOptions>();

        return services;
    }
}