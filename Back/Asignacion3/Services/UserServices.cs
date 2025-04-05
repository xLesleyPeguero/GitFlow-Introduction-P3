using Asignacion3.Context;
using Asignacion3.Interfaces;
using Asignacion3.Models;
using Microsoft.EntityFrameworkCore;

namespace Asignacion3.Services
{
    public class UserServices : IUser
    {
        private readonly P2apiContext _context;

        public UserServices(P2apiContext _context) 
        {
            this._context = _context;
        }
        public string Create(User user)
        {
            _context.Usuario.Add(user);
            _context.SaveChanges();
            return "User has been saved successfully.";
        }

        public string Delete(int id)
        {
            var register = _context.Usuario.Find(id);
            _context.Usuario.Remove(register);
            _context.SaveChanges();
            return "User has been deleted successfully.";
        }

        public List<User> GetAll()
        {
            return _context.Usuario.ToList();
        }

        public string Login(string correo, string password)
        {
            if (string.IsNullOrEmpty(correo) && string.IsNullOrEmpty(password))  
            {
                return "Please insert a user and the password";
            }

            var user = _context.Usuario.FirstOrDefault(u => u.Correo.Equals(correo) && u.Clave.Equals(password));
            if (user == null) 
            {
                return "Incorrect user/password. Please try again";
            }


            return "Welcome!";
        }

        public User Search(string name)
        {
            var register = _context.Usuario.FirstOrDefault(u => u.Nombre.Equals(name));
            return new User 
            {
                Id = register.Id,
                Nombre = register.Nombre,
                Correo = register.Correo,
                Clave = register.Clave,
                Estatus = register.Estatus
            };
        }

        public string Update(User user)
        {
            _context.Entry(user).State = EntityState.Modified;
            _context.SaveChanges();
            return "User has been updated successfully.";
        }


    }
}
