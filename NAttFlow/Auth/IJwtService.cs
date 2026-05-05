using NattFlow.Entities;

namespace NattFlow.Auth;

public interface IJwtService
{
    string GenerateToken(User user);
}