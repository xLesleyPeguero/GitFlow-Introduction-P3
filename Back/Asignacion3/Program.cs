
using Asignacion3.Context;
using Asignacion3.Interfaces;
using Asignacion3.Services;

namespace Asignacion3
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            //Configuración servicio CORS para consumo API
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowCORS",
                    builder => builder.AllowAnyOrigin()
                                       .AllowAnyHeader()
                                       .AllowAnyMethod());
            });

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            builder.Services.AddSqlServer<P2apiContext>(builder.Configuration.GetConnectionString("AppConnection"));
            //Usuarios user
            builder.Services.AddScoped<IUser, UserServices>();
            //Paises country
            builder.Services.AddScoped<ICountry, CountryServices>();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            //Usar Politica CORS para consumo API
            app.UseCors("AllowCORS");

            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
