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


namespace quantum_apis.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    public class WalkinApplyController : ControllerBase

    {

        private readonly IConfiguration _configuration;
        public WalkinApplyController(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        // Connection string to your SQL Server database

        [HttpPost]
        public async Task<ActionResult> walkinApply(
            [FromBody] WalkinApplyReqDTO model
            )
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("provide valid info");
            }
            // WalkinApplyResDTO responseObj = new() { };
            int applicationId = -1;
            WalkinApplyResDTO responseObj = new WalkinApplyResDTO();
            responseObj.userId = model.userId;
            responseObj.walkinId = model.walkinId;
            responseObj.selectedTimeslotId = model.selectedTimeslotId;


            using (MySqlConnection connection = new MySqlConnection(_configuration.GetConnectionString("Default")))
            {
                Console.WriteLine("in try");
                string query = "";
                // call(prociser name)
                using (MySqlCommand command = new MySqlCommand(@"
                INSERT INTO user_application (userId, walkinId,selectedTimeslotId,dateCreated) VALUES (@userId, @walkinId,@selectedTimeslotId,@dateCreated);"
                , connection))
                {
                    Console.WriteLine("in try");
                    // command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@userId", model.userId);
                    command.Parameters.AddWithValue("@walkinId", model.walkinId);
                    command.Parameters.AddWithValue("@selectedTimeslotId", model.selectedTimeslotId);
                    command.Parameters.AddWithValue("@dateCreated", model.dateCreated);
                    try
                    {
                        connection.Open();
                        command.ExecuteNonQuery();
                        command.CommandText = "select max(id)  from user_application";
                        applicationId = (int)command.ExecuteScalar();
                        responseObj.userApplicationId = applicationId;
                        await connection.CloseAsync();
                    }
                    catch (Exception ex)
                    {
                        await connection.CloseAsync();
                        // Handle exception (log, return error response, etc.)
                        Console.WriteLine(ex);
                        return BadRequest(ex);
                    }
                }
            }
            foreach (var jobroleItem in model.walkinJobRoleId)
            {
                using (MySqlConnection con = new MySqlConnection(_configuration.GetConnectionString("Default")))
                {
                    con.Open();
                    MySqlCommand cmd = new MySqlCommand(@"
                     INSERT INTO user_application_preferredjobrole (walkinJobRoleId, userApplicationId,dateCreated) VALUES (@walkinJobRoleId, @userApplicationId,@dateCreated);
                    ", con);
                    // cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@walkinJobRoleId", jobroleItem);
                    cmd.Parameters.AddWithValue("@userApplicationId", applicationId);
                    cmd.Parameters.AddWithValue("@dateCreated", model.dateCreated);
                    // cmd.Parameters.Add("@item1" );
                    // cmd.Parameters.Add("@item2");

                    // cmd.Parameters[0].Value = item.localUsername;
                    // cmd.Parameters[1].Value = item.BetfairUsername;
                    try
                    {
                        cmd.ExecuteNonQuery();
                    }
                    catch (Exception exp)
                    {
                        throw exp;
                    }
                }

            }
            responseObj.status = "success";
            return Ok(responseObj);

        }



    }


}

