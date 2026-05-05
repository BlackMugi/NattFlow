using System.Net;
using System.Text.Json;
using NattFlow.Exceptions;

namespace NattFlow.Middlewares;

public class ErrorHandlingMiddleware(RequestDelegate next, ILogger<ErrorHandlingMiddleware> logger)
{
    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await next(context);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Unhandled exception");
            await HandleExceptionAsync(context, ex);
        }
    }

    private static Task HandleExceptionAsync(HttpContext context, Exception ex)
    {
        var (statusCode, message) = ex switch
        {
            NotFoundException e     => (HttpStatusCode.NotFound, e.Message),
            ConflictException e     => (HttpStatusCode.Conflict, e.Message),
            UnauthorizedException e => (HttpStatusCode.Unauthorized, e.Message),
            _                       => (HttpStatusCode.InternalServerError, "Une erreur interne est survenue.")
        };

        context.Response.ContentType = "application/json";
        context.Response.StatusCode = (int)statusCode;

        var body = JsonSerializer.Serialize(new { error = message });
        return context.Response.WriteAsync(body);
    }
}