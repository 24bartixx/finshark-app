
using backend.Dtos.Account;
using backend.Model;

namespace backend.Mappers
{
    public static class AccountMappers
    {
        public static NewUserDto ToNewUserDto(this AppUser appUser, string token)
        {
            return new NewUserDto
            {
                UserName = appUser.UserName,
                Email = appUser.Email,
                Token = token
            };
        }
    }
}