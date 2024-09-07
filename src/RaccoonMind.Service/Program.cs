using RaccoonMind.Application;
using RaccoonMind.Application.Dto;
using RaccoonMind.Application.Services;
using Serilog;

var builder = WebApplication.CreateBuilder(args);

Log.Logger = new LoggerConfiguration()
    .ReadFrom.Configuration(builder.Configuration)
    .CreateLogger();

builder.Host.UseSerilog(Log.Logger);
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddRaccoonMindApplication(builder.Configuration);
builder.Services.AddResponseCompression();

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();
app.UseResponseCompression();
app.Use((async (context, next) =>
{
    await next(context);

    if (context.Response.StatusCode == 404)
    {
        context.Request.Path = "/index.html";
        await next(context);
    }
}));

app.UseStaticFiles();
app.UseDefaultFiles("/index.html");

var mind = app.MapGroup("/api/v1/mind")
    .WithDisplayName("Mind")
    .WithDescription("Mind API")
    .WithOpenApi()
    .WithTags("Mind");

mind.MapPost("/mind-stream",
        async (MindMapService service, HttpContext context, KernelService kernelService, MiniStreamInput input) =>
            await service.MiniStreamAsync(context, kernelService, input))
    .WithDisplayName("MiniStream")
    .WithDescription("MiniStream API")
    .WithOpenApi()
    .WithTags("Mind");

await app.RunAsync();