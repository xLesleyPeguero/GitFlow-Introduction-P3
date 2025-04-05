using Asignacion3.Interfaces;
using Asignacion3.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics.Metrics;

namespace Asignacion3.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CountryController : ControllerBase
    {
        private readonly ICountry service;

        public CountryController(ICountry service)
        {
            this.service = service;
        }

        [HttpGet("AllCountries")]
        public List<Country> GetAll()
        {
            return service.GetAll();
        }

        [HttpPost("AddCountry")]
        public string Create(Country country)
        {
            return service.Create(country);
        }

        [HttpPut("UpdateCountry")]
        public string Update(Country country)
        {
            return service.Update(country);
        }
        [HttpDelete("DeleteCountry")]
        public string Delete(int id)
        {
            return service.Delete(id);
        }
        [HttpGet("FindCountry")]
        public Country Search(string name)
        {
            return service.Search(name);
        }
    }
}
