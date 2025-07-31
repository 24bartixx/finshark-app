

using backend.Model;

namespace backend.Interfaces
{
    public interface ITokenService
    {
        string CreateToken(AppUser appUser);
    }
}