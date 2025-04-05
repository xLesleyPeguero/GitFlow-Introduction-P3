using Asignacion3.Interfaces;
using Asignacion3.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Asignacion3.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUser service;

        public UserController(IUser service)
        {
            this.service = service;
        }

        [HttpGet("AllUsers")]
        public List<User> GetAll()
        {
            return service.GetAll();
        }

        [HttpPost("AddUser")]
        public string Create(User user)
        {
            return service.Create(user);
        }

        [HttpPut("UpdateUser")]
        public string Update(User user)
        {
            return service.Update(user);
        }
        [HttpDelete("DeleteUser")]
        public string Delete(int id)
        {
            return service.Delete(id);
        }
        [HttpGet("FindUser")]
        public User Search(string name)
        {
            return service.Search(name);
        }
        [HttpGet("UserLogin")]
        public string Login(string correo, string password) 
        {
            return service.Login(correo, password);
        }
    }
}
