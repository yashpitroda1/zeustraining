using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MySqlConnector;
using quantum_apis.models;
using Newtonsoft.Json;
using System.Security.Claims;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace quantum_apis.Controllers
{
    [Route("[controller]")]
    [Authorize(Roles = "admin")]
    // [Authorize(Roles = "user")]

    public class TestController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public TestController(IConfiguration configuration)
        {

            _configuration = configuration;

        }
        [HttpPost]
        public async Task<ActionResult> testAsync()
        {

            using var connection = new MySqlConnection(_configuration.GetConnectionString("Default"));
            await connection.OpenAsync();
            using var command = new MySqlCommand("select * from walkin_instruction where walkinId=8", connection);

            using var reader = await command.ExecuteReaderAsync();
            string x = "";
            if (reader.HasRows)
            {
                while (await reader.ReadAsync())
                {

                    string generalInstructions = reader["generalInstructions"].ToString();
                    var result = JsonConvert.DeserializeObject<inst>(generalInstructions);
                    Console.WriteLine(result.generalInstructions[0]);
                    x = result.generalInstructions[1];
                }
            }
            return Ok(x);
        }
    }

    public class inst
    {
        public List<string> generalInstructions { get; set; }
    }
}

