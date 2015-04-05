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
        Task<List<string>> GetMakes(int year);
        Task<List<string>> GetModels(int year, string make);
        Task<List<string>> GetTrims(int year, string make, string model);
        Task<List<Car>> GetCars(int year, string make, string model, string trim);
    }
}