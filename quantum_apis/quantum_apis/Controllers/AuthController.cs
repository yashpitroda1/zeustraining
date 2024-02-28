using System;
using System.Collections.Generic;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using MySqlConnector;
using quantum_apis.models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860


namespace quantum_apis.Controllers
{
    [Route("[controller]")]
    [AllowAnonymous]
    public class AuthController : ControllerBase

    {
        private readonly IConfiguration _configuration;
        public AuthController(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        // GET: api/values
        //[HttpGet]
        //public IEnumerable<string> Get()
        //{
        //    return new string[] { "value1", "value2" };
        //}

        //// GET api/values/5
        //[HttpGet("{id}")]
        //public string Get(int id)
        //{
        //    return "value";
        //}

        //// POST api/values
        //[HttpPost]
        //public void Post([FromBody]string value)
        //{
        //}

        //// PUT api/values/5
        //[HttpPut("{id}")]
        //public void Put(int id, [FromBody]string value)
        //{
        //}

        //// DELETE api/values/5
        //[HttpDelete("{id}")]
        //public void Delete(int id)
        //{
        //}
        [HttpPost("Login")]
        public async Task<ActionResult> loginAsync([FromBody] LoginReqDTO model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("provide userEmail and password");
            }
            //LoginResDTO response = new LoginResDTO();
            LoginResDTO responseObj = new() { userEmail = model.userEmail, role = model.role };

            using var connection = new MySqlConnection(_configuration.GetConnectionString("Default"));
            await connection.OpenAsync();
            using var command = new MySqlCommand("select * from user where password=@pass AND userEmail=@email", connection);
            command.Parameters.AddWithValue("@pass", model.password);
            command.Parameters.AddWithValue("@email", model.userEmail);
            using var reader = await command.ExecuteReaderAsync();
            if (reader.HasRows)
            {
                while (await reader.ReadAsync())
                {
                    //var value = reader.GetValue(0); //id
                    //var value = reader.GetValue(1); //email
                    string uid = reader["id"].ToString();
                    string userEmail = reader["userEmail"].ToString();
                    int uidInt = Convert.ToInt32(reader["id"]);
                    responseObj.id = uidInt;
                }
            }
            else
            {
                await connection.CloseAsync();
                return Ok("invalid username and password - not match with database");
            }
            await connection.CloseAsync();

            //token
            DateTime expiresTime = model.isRememberMe ? DateTime.UtcNow.AddDays(5) : DateTime.UtcNow.AddMinutes(1);
            var key = Encoding.ASCII.GetBytes(_configuration.GetValue<string>("JWTSecret"));
            //tokenHandler
            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenDescriptor = new SecurityTokenDescriptor()
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                        new Claim(ClaimTypes.Email, model.userEmail),
                        new Claim(ClaimTypes.Role, model.role),
                        new Claim(ClaimTypes.NameIdentifier, responseObj.id.ToString())
                }),
                Expires = expiresTime,
                SigningCredentials = new(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha512Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            DateTime tokenExpiresAt = token.ValidTo;
            responseObj.tokenExpiresAt = tokenExpiresAt;
            responseObj.token = tokenHandler.WriteToken(token);
            Console.WriteLine("----");
            Console.WriteLine(responseObj.tokenExpiresAt);
            Console.WriteLine(responseObj.userEmail);
            Console.WriteLine("----");

            return Ok(responseObj);
        }
    }


}

