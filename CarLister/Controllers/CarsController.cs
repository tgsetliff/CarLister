using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Insight.Database;
using Microsoft.AspNet.Identity.Owin;
using System.Web;
using System.Threading.Tasks;
using CarLister.Models.Data_Interfaces;
using CarLister.Models;
using Bing;

namespace CarLister.Controllers
{
    [RoutePrefix("api/cars")]
    public class CarsController : ApiController
    {
        private ICarsAccess db;

        public CarsController()
        {            
            db = HttpContext.Current.GetOwinContext().Get<SqlConnection>().As<ICarsAccess>();
        }

        [HttpGet, HttpPost, Route("getYears")]
        public async Task<IHttpActionResult> GetYears()
        {
            return Ok(await db.GetYears());
        }

        [HttpGet, HttpPost, Route("getMakes")]
        public async Task<IHttpActionResult> GetMakes(string year)
        {
            return Ok(await db.GetMakes(year));
        }

        [HttpGet, HttpPost, Route("getModels")]
        public async Task<IHttpActionResult> GetModels(string year, string make)
        {
            return Ok(await db.GetModels(year, make));
        }

        [HttpGet, HttpPost, Route("getTrims")]
        public async Task<IHttpActionResult> GetTrims(string year, string make, string model)
        {
            return Ok(await db.GetTrims(year, make, model));
        }

        [HttpGet, HttpPost, Route("getCars")]
        public async Task<IHttpActionResult> GetCars(string year, string make, string model, string trim)
        {
            return Ok(await db.GetCars(year, make, model, trim));
        }
        
        [HttpGet, HttpPost, Route("getCar")]
        public async Task<IHttpActionResult> GetCar( int id)
        {
            HttpResponseMessage response;
            string content = "";

            var car = new CarViewModel
            {
                Car = await (db.GetCar(id)),
                recall = "",
                imageurl = ""
            };

            // get car recall data

            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri("http://www.nhtsa.gov/");
                try
                {
                    response = await client.GetAsync("webapi/api/recalls/vehicle/modelyear/" + car.Car.year + "/make/" + car.Car.make + "/model/" + car.Car.model + "?format=json");
                    content = await response.Content.ReadAsStringAsync();
                    
                }
                catch (Exception e)
                {
                    return InternalServerError(e);
                }
                
                car.recall = content;

                var image = new BingSearchContainer(new Uri("https://api.datamarket.azure.com/Bing/search/"));
                image.Credentials = new NetworkCredential("accountKey", "JUc6xnb5P167bvXPUJE8zHrTuIXZdTgLMy4Wk5NGx98");
                var marketData = image.Composite(
	                "image",
	                car.Car.year + " " + car.Car.make + " " + car.Car.model + " " + car.Car.trim,
	                null,
	                null,	                
	                null,
                    null,
	                null,
	                null,
	                null,
	                null,
	                null,
	                null,
	                null,
	                null,
	                null
	                ).Execute();

                car.imageurl = marketData.First().Image.First().MediaUrl;
                }

            return Ok(car);
        }
    }
}
