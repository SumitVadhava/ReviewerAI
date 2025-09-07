using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Services;
using Westwind.AspNetCore.LiveReload;
using Serilog;
using Serilog.Events;

var builder = WebApplication.CreateBuilder(args);

// Add services
builder.Services.AddControllersWithViews();
builder.Services.AddControllers();
builder.Services.AddLiveReload();
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
// ✅ Register JwtService with secret from config

builder.Services.AddScoped<JwtService>(provider =>
{
    var config = provider.GetRequiredService<IConfiguration>();
    return new JwtService(config);
});

// Cors
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins",
        builder => builder.AllowAnyOrigin()
                          .AllowAnyMethod()
                          .AllowAnyHeader());
});


Log.Logger = new LoggerConfiguration()
    .WriteTo.Console()
    .Enrich.FromLogContext()
    .CreateLogger();

// Log.Logger = new LoggerConfiguration()
//     .MinimumLevel.Error() // Restrict logs to Error and Fatal levels only
//     .WriteTo.Console(
//         outputTemplate: "{Timestamp:yyyy-MM-dd HH:mm:ss} [{Level:u3}] {Message:lj}{NewLine}{Exception}") // Simplified output
//     .Enrich.FromLogContext()
//     .Filter.ByExcluding(logEvent => logEvent.Level == LogEventLevel.Error && logEvent.MessageTemplate.Text.Contains("SpecificErrorToIgnore")) // Optional: Exclude specific error messages
//     .CreateLogger();

// Log.Logger = new LoggerConfiguration()
//     .MinimumLevel.Warning()
//     .MinimumLevel.Override("Microsoft.AspNetCore.Hosting.Diagnostics", LogEventLevel.Information) // for request start/finish
//     .MinimumLevel.Override("Microsoft.AspNetCore.Server.Kestrel", LogEventLevel.Warning)
//     .MinimumLevel.Override("Microsoft.AspNetCore.HttpLogging", LogEventLevel.Information) // Optional if you use `UseHttpLogging`
//     .MinimumLevel.Override("Microsoft.AspNetCore", LogEventLevel.Warning)
//     .MinimumLevel.Override("System", LogEventLevel.Warning)
//     .WriteTo.Console()
//     .Enrich.FromLogContext()
//     .CreateLogger();


builder.Host.UseSerilog();


var app = builder.Build();

// Middleware
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseLiveReload();
app.UseSerilogRequestLogging(); // Logs HTTP info like morgan
app.UseAuthorization();
app.MapControllers();
app.UseCors("AllowAllOrigins"); 

app.MapGet("/test-db", async (AppDbContext db) =>
{
    var canConnect = await db.Database.CanConnectAsync();
    return canConnect ? Results.Ok("✅ DB connected") : Results.Problem("❌ DB not connected");
});

app.MapGet("/", () => "Welcome to the ReviewerAI! 🤖 ☠️ 🔥");

// app.MapControllerRoute(
//     name: "default",
//     pattern: "{controller=Home}/{action=Index}/{id?}"
// );

app.Run();