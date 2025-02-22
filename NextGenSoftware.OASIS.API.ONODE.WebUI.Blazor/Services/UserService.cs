using NextGenSoftware.OASIS.API.ONODE.WebUI.Blazor.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace NextGenSoftware.OASIS.API.ONODE.WebUI.Blazor.Services
{
    public interface IUserService
    {
        Task<IEnumerable<User>> GetAll();
    }

    public class UserService : IUserService
    {
        private IHttpService _httpService;

        public UserService(IHttpService httpService)
        {
            _httpService = httpService;
        }

        public async Task<IEnumerable<User>> GetAll()
        {
            return await _httpService.Get<IEnumerable<User>>("/users");
        }
    }
}