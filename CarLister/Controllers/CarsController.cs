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

        [HttpGet, HttpPost, Route("getRecalls")]
        public async Task<IHttpActionResult> getRecalls(string year, string make, string model)
        {
            HttpResponseMessage response;
            string content = "";

            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri("http://www.nhtsa.gov/");
                try
                {
                    response = await client.GetAsync("webapi/api/recalls/vehicle/modelyear/" + year + "/make/" + make + "/model/" + model + "?format=json");
                    content = await response.Content.ReadAsStringAsync();
                }
                catch (Exception e)
                {
                    return InternalServerError(e);
                }
            }
            return Ok(content);

        }
    }
}
