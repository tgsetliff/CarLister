using Insight.Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace CarLister.Models.Data_Interfaces
{
    public interface ICarsAccess
    {
        Task<List<string>> GetYears();
        Task<List<string>> GetMakes(string year);
        Task<List<string>> GetModels(string year, string make);
        Task<List<string>> GetTrims(string year, string make, string model);
        Task<List<Car>> GetCars(string year, string make, string model, string trim);

        [Sql("Select * from Cars Where Id = @id")]
        Task<Car> GetCar(int id);
    }
}