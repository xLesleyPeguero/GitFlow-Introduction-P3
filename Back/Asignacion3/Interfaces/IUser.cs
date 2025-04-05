using Asignacion3.Models;

namespace Asignacion3.Interfaces
{
    public interface IUser
    {
        string Create(User user);

        string Update(User user);

        string Delete(int id);

        User Search(string name);

        List<User> GetAll();

        string Login(string correo, string password);
    }

}
