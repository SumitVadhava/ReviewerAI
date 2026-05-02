using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Services;
using Westwind.AspNetCore.LiveReload;
using Serilog;
using Serilog.Events;
using Microsoft.AspNetCore.WebUtilities;

var builder = WebApplication.CreateBuilder(args);

// Add services
builder.Services.AddControllersWithViews();
builder.Services.AddControllers();
builder.Services.AddLiveReload();
builder.Services.AddDbContext<AppDbContext>(options =>
options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// JWT Service
builder.Services.AddScoped<JwtService>(provider =>
{
    var config = provider.GetRequiredService<IConfiguration>();
    return new JwtService(config);
});

// Cors
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins",
        builder => builder.SetIsOriginAllowed(origin => true)
                          .AllowAnyMethod()
                          .AllowAnyHeader()
                          .AllowCredentials());
});


Log.Logger = new LoggerConfiguration()
    .WriteTo.Console()
    .Enrich.FromLogContext()
    .CreateLogger();



// builder.Host.UseSerilog();

builder.Host.UseSerilog((context, configuration) =>
{
    configuration
        .MinimumLevel.Information()
        .MinimumLevel.Override("Microsoft", LogEventLevel.Warning)
        .MinimumLevel.Override("Microsoft.Hosting.Lifetime", LogEventLevel.Information)
        .WriteTo.Console();
});


var app = builder.Build();

app.UseCors("AllowAllOrigins"); 

// Middleware
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

// app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseLiveReload();

// app.Use(async (context, next) =>
// {
//     var logger = app.Logger;
//     logger.LogInformation("➡ Request: {Method} {Path}",
//         context.Request.Method,
//         context.Request.Path);

//     await next.Invoke();

//     logger.LogInformation("⬅ Response: {StatusCode} {Path}",
//         context.Response.StatusCode,
//         context.Request.Path);
// });

// app.UseSerilogRequestLogging(options =>
// {
//     options.MessageTemplate = "➡️ HTTP {RequestMethod} {RequestPath} responded {StatusCode} in {Elapsed:0.0000} ms";
//     options.GetLevel = (httpContext, elapsed, ex) => LogEventLevel.Information;
// });

app.UseSerilogRequestLogging(options =>
{
    options.MessageTemplate =
        "➡️ HTTP {RequestMethod} {RequestPath} responded {StatusCode} {ReasonPhrase} in {Elapsed:0.0000} ms";

    options.EnrichDiagnosticContext = (diagnosticContext, httpContext) =>
    {
        var statusCode = httpContext.Response.StatusCode;
        var reasonPhrase = ReasonPhrases.GetReasonPhrase(statusCode);

        diagnosticContext.Set("StatusCode", statusCode);
        diagnosticContext.Set("ReasonPhrase", reasonPhrase);
    };

    options.GetLevel = (httpContext, elapsed, ex) => LogEventLevel.Information;
});

app.UseAuthorization();
app.MapControllers();

app.MapGet("/", () => "Welcome to the ReviewerAI! 🤖 ☠️ 🔥");

// app.MapControllerRoute(
//     name: "default",
//     pattern: "{controller=Home}/{action=Index}/{id?}"
// );

app.Run();