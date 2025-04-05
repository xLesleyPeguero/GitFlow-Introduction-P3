using Asignacion3.Context;
using Asignacion3.Interfaces;
using Asignacion3.Models;
using Microsoft.EntityFrameworkCore;

namespace Asignacion3.Services
{
    public class CountryServices : ICountry

    {
        private readonly P2apiContext _context;

        public CountryServices(P2apiContext _context)
        {
            this._context = _context;
        }
        public string Create(Country country)
        {
            {
                _context.Paises.Add(country);
                _context.SaveChanges();
                return "Country has been added successfully.";
            }
        }

        public string Delete(int id)
        {
            var registro = _context.Paises.Find(id);
            _context.Paises.Remove(registro);
            _context.SaveChanges();
            return "Country has been deleted successfully.";
        }

        public List<Country> GetAll()
        {
            return _context.Paises.ToList();

        }

        public Country Search(string name)
        {
            var register = _context.Paises.FirstOrDefault(c => c.Nombre.Equals(name));
            return new Country
            {
                Id = register.Id,
                Nombre = register.Nombre,
                Gentilicio = register.Gentilicio,
                Capital = register.Capital,
                Estatus = register.Estatus
            };
        }

        public string Update(Country country)
        {
            {
                _context.Entry(country).State = EntityState.Modified;
                _context.SaveChanges();
                return "Country has been updated successfully.";
            }
        }

      
    }
}
