using Asignacion3.Models;

namespace Asignacion3.Interfaces
{
    public interface ICountry
    {
        string Create(Country country);

        string Update(Country country);

        string Delete(int id);

        Country Search(string name);

        List<Country> GetAll();
    }
}
