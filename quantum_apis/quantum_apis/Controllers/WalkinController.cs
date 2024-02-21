using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using MySqlConnector;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using quantum_apis.models;
using quantum_apis.Models;
using quantum_apis.Models.Walkin;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace quantum_apis.Controllers
{
    [Route("api/[controller]")]
    [Authorize(Roles = "user")]
    public class WalkinController : ControllerBase
    {
     
        private readonly IConfiguration _configuration;
        public WalkinController(IConfiguration configuration)
        {

            _configuration = configuration;

        }
        [HttpGet("DataList")]
        public async Task<ActionResult> walkinDataList()
        {
            List<WalkinModel> walkinDataList = new List<WalkinModel>();
           
            using var connection = new MySqlConnection(_configuration.GetConnectionString("Default"));
            await connection.OpenAsync();
            using var command = new MySqlCommand("SELECT wd.id,wd.walkinTitle,wd.walkinNotes,wd.walkinStartingDate,wd.walkinEndingDate,wd.walkinAddress,wd.walkinCity,wd.walkinThingsToRemember,wi.generalInstructions,wi.examInstructions,wi.systemRequirements,wi.processDetails, wjr.id AS walkinJobRoleId,ejr.id AS enumJobRoleId,ejr.roleName,ejr.grossCompensationPackage,ejr.roleDescription,ejr.requirements,wts.id AS walkinTimeSlotId,wts.timeSlot FROM walkin_data wd JOIN walkin_instruction wi ON wd.id = wi.walkinId JOIN walkin_jobRole wjr ON wd.id = wjr.walkinId JOIN enum_job_role ejr ON wjr.jobRoleId = ejr.id JOIN walkin_timeslot wts ON wts.walkInId = wd.id ORDER BY wd.id", connection);
            using var reader = await command.ExecuteReaderAsync();
            
            if (reader.HasRows)
            {
                while (await reader.ReadAsync())
                {
                    //string to Dictionary - jsonObject
                    if (walkinDataList.Count == 0)
                    {
                        var walkinAddressDict = JsonConvert.DeserializeObject<Dictionary<string, object>>(reader["walkinAddress"].ToString());
                        var walkinThingsToRememberDict = JsonConvert.DeserializeObject<Dictionary<string, List<string>>>(reader["walkinThingsToRemember"].ToString());
                        var requirementsDict = JsonConvert.DeserializeObject<Dictionary<string, List<string>>>(reader["requirements"].ToString());
                        var roleDescriptionDict = JsonConvert.DeserializeObject<Dictionary<string, List<string>>>(reader["roleDescription"].ToString());

                        var examInstructionsDict = JsonConvert.DeserializeObject<Dictionary<string, List<string>>>(reader["examInstructions"].ToString());
                        var generalInstructionsDict = JsonConvert.DeserializeObject<Dictionary<string, List<string>>>(reader["generalInstructions"].ToString());
                        var systemRequirementsDict = JsonConvert.DeserializeObject<Dictionary<string, List<string>>>(reader["systemRequirements"].ToString());

                        //Console.WriteLine(processDetailsDict["process"]);
                        RecruitmentProcessModelWrapper RecruitmentProcessModelWrapperObj = JsonConvert.DeserializeObject<RecruitmentProcessModelWrapper>(reader["processDetails"].ToString());

                        // Get the RecruitmentProcessModel object
                        RecruitmentProcessModel recruitmentProcessModelobj = RecruitmentProcessModelWrapperObj.process;


                        var walkinInstructionObj = new WalkinInstructionModel()
                        {
                           
                          
                            examInstructions = examInstructionsDict["examInstructions"],
                            generalInstructions = generalInstructionsDict["generalInstructions"],
                            processDetails = recruitmentProcessModelobj,
                            systemRequirements = systemRequirementsDict["systemRequirements"],
                        };

                        //jobrole
                        var jobRoleObj = new WalkinJobRoleModel()
                        {

                            walkinJobRoleId = Convert.ToInt32(reader["walkinJobRoleId"]),
                            enumJobRoleId = Convert.ToInt32(reader["enumJobRoleId"]),
                            roleName = reader["roleName"].ToString(),
                            grossCompensationPackage = reader["grossCompensationPackage"].ToString(),
                            requirements = requirementsDict["requirements"],
                            roleDescription = roleDescriptionDict["roleDescription"],

                        };
                        List<WalkinJobRoleModel> jobroleList = new List<WalkinJobRoleModel>();
                        jobroleList.Add(jobRoleObj);

                        //timeslot
                        var timeSlotbj = new WalkinTimeSlotModel()
                        {
                            walkinTimeSlotId = Convert.ToInt32(reader["walkinTimeSlotId"]),
                            timeSlot = reader["timeSlot"].ToString(),
                        };
                        List<WalkinTimeSlotModel> timeSlotList = new List<WalkinTimeSlotModel>();
                        timeSlotList.Add(timeSlotbj);

                        //walkin
                        var walkinObj = new WalkinModel()
                        {
                            id = Convert.ToInt32(reader["id"]),
                            walkinTitle = reader["walkinTitle"].ToString(),
                            walkinNotes = string.IsNullOrEmpty(reader["walkinNotes"].ToString()) ? null : reader["walkinNotes"].ToString(),
                            walkinStartingDate = DateTime.Parse(reader["walkinStartingDate"].ToString()),
                            walkinEndingDate = DateTime.Parse(reader["walkinEndingDate"].ToString()),
                            walkinAddress = JsonConvert.DeserializeObject<WalkinAddressModel>(JsonConvert.SerializeObject(walkinAddressDict["walkinAddress"])),
                            walkinCity = reader["walkinCity"].ToString(),
                            walkinThingsToRemember = walkinThingsToRememberDict["walkinThingsToRemember"],
                            walkinJobRole = jobroleList,
                            walkinTimeSlot = timeSlotList,
                            walkinInstruction = walkinInstructionObj,


                        };
                        walkinDataList.Add(walkinObj);
                    }
                    else
                    {
                        var listFountedWalkinObj = walkinDataList.FirstOrDefault(p => p.id == Convert.ToInt32(reader["id"]));
                        if (listFountedWalkinObj == null)
                        {

                            var walkinAddressDict = JsonConvert.DeserializeObject<Dictionary<string, object>>(reader["walkinAddress"].ToString());
                            var walkinThingsToRememberDict = JsonConvert.DeserializeObject<Dictionary<string, List<string>>>(reader["walkinThingsToRemember"].ToString());
                            var requirementsDict = JsonConvert.DeserializeObject<Dictionary<string, List<string>>>(reader["requirements"].ToString());
                            var roleDescriptionDict = JsonConvert.DeserializeObject<Dictionary<string, List<string>>>(reader["roleDescription"].ToString());

                            var examInstructionsDict = JsonConvert.DeserializeObject<Dictionary<string, List<string>>>(reader["examInstructions"].ToString());
                            var generalInstructionsDict = JsonConvert.DeserializeObject<Dictionary<string, List<string>>>(reader["generalInstructions"].ToString());
                            var systemRequirementsDict = JsonConvert.DeserializeObject<Dictionary<string, List<string>>>(reader["systemRequirements"].ToString());
                            //var processDetailsDict = JsonConvert.DeserializeObject<Dictionary<string, dynamic>>(reader["processDetails"].ToString()); //work pending


                            //Console.WriteLine(processDetailsDict["process"]);
                            RecruitmentProcessModelWrapper RecruitmentProcessModelWrapperObj = JsonConvert.DeserializeObject<RecruitmentProcessModelWrapper>(reader["processDetails"].ToString());

                            // Get the RecruitmentProcessModel object
                            RecruitmentProcessModel recruitmentProcessModelobj = RecruitmentProcessModelWrapperObj.process;
                           
                            var walkinInstructionObj = new WalkinInstructionModel()
                            {

                                examInstructions = examInstructionsDict["examInstructions"],
                                generalInstructions = generalInstructionsDict["generalInstructions"],
                                processDetails = recruitmentProcessModelobj,
                                systemRequirements = systemRequirementsDict["systemRequirements"],
                            };

                            //jobrole
                            var jobRoleObj = new WalkinJobRoleModel()
                            {

                                walkinJobRoleId = Convert.ToInt32(reader["walkinJobRoleId"]),
                                enumJobRoleId = Convert.ToInt32(reader["enumJobRoleId"]),
                                roleName = reader["roleName"].ToString(),
                                grossCompensationPackage = reader["grossCompensationPackage"].ToString(),
                                requirements = requirementsDict["requirements"],
                                roleDescription = roleDescriptionDict["roleDescription"],

                            };
                            List<WalkinJobRoleModel> jobroleList = new List<WalkinJobRoleModel>();
                            jobroleList.Add(jobRoleObj);

                            //timeslot
                            var timeSlotbj = new WalkinTimeSlotModel()
                            {
                                walkinTimeSlotId = Convert.ToInt32(reader["walkinTimeSlotId"]),
                                timeSlot = reader["timeSlot"].ToString(),
                            };
                            List<WalkinTimeSlotModel> timeSlotList = new List<WalkinTimeSlotModel>();
                            timeSlotList.Add(timeSlotbj);

                            //walkin
                            var walkinObj = new WalkinModel()
                            {
                                id = Convert.ToInt32(reader["id"]),
                                walkinTitle = reader["walkinTitle"].ToString(),
                                walkinNotes = string.IsNullOrEmpty(reader["walkinNotes"].ToString()) ? null : reader["walkinNotes"].ToString(),
                                walkinStartingDate = DateTime.Parse(reader["walkinStartingDate"].ToString()),
                                walkinEndingDate = DateTime.Parse(reader["walkinEndingDate"].ToString()),
                                walkinAddress = JsonConvert.DeserializeObject<WalkinAddressModel>(JsonConvert.SerializeObject(walkinAddressDict["walkinAddress"])),
                                walkinCity = reader["walkinCity"].ToString(),
                                walkinThingsToRemember = walkinThingsToRememberDict["walkinThingsToRemember"],
                                walkinJobRole = jobroleList,
                                walkinTimeSlot = timeSlotList,
                                walkinInstruction = walkinInstructionObj,


                            };
                            walkinDataList.Add(walkinObj);
                        }
                        else
                        {
                            //walkinobj is there
                            var indexOfWalkIn = walkinDataList.FindIndex(m => m.id == listFountedWalkinObj.id);
                            int listsize = listFountedWalkinObj.walkinJobRole.Count;
                            
                            int i = 0;
                            for (; i < listsize; i++)
                            {
                                if ((Convert.ToInt32(reader["walkinJobRoleId"]) == listFountedWalkinObj.walkinJobRole[i].walkinJobRoleId && listFountedWalkinObj.walkinJobRole[i].enumJobRoleId == Convert.ToInt32(reader["enumJobRoleId"])))
                                {
                                    

                                    break;
                                }
                                

                            }
                            if (i == listsize)
                            {
                                var requirementsDict = JsonConvert.DeserializeObject<Dictionary<string, List<string>>>(reader["requirements"].ToString());
                                var roleDescriptionDict = JsonConvert.DeserializeObject<Dictionary<string, List<string>>>(reader["roleDescription"].ToString());
                                //add jobrole
                                var jobRoleObj_ = new WalkinJobRoleModel()
                                {

                                    walkinJobRoleId = Convert.ToInt32(reader["walkinJobRoleId"]),
                                    enumJobRoleId = Convert.ToInt32(reader["enumJobRoleId"]),
                                    roleName = reader["roleName"].ToString(),
                                    grossCompensationPackage = reader["grossCompensationPackage"].ToString(),
                                    requirements = requirementsDict["requirements"],
                                    roleDescription = roleDescriptionDict["roleDescription"],

                                };
                                walkinDataList[indexOfWalkIn].walkinJobRole.Add(jobRoleObj_);
                              

                            }
                            listsize = listFountedWalkinObj.walkinTimeSlot.Count;
                             i = 0;
                            for (; i < listsize; i++)
                            {
                                if (Convert.ToInt32(reader["walkinTimeSlotId"]) == listFountedWalkinObj.walkinTimeSlot[i].walkinTimeSlotId )
                                {
                                    
                                    break;
                                }


                            }
                            if (i == listsize)
                            {
                                //add timeslot
                                var timeSlotbj = new WalkinTimeSlotModel()
                                {
                                    walkinTimeSlotId = Convert.ToInt32(reader["walkinTimeSlotId"]),
                                    timeSlot = reader["timeSlot"].ToString(),
                                };
                                walkinDataList[indexOfWalkIn].walkinTimeSlot.Add(timeSlotbj);
                                
                            }

                           
                           


                        }

                    }
                  
                    //walkinObj.walkinJobRole.Add(jobRoleObj);
                    //Console.WriteLine(walkinObj.walkinInstruction.processDetails["rounds"]);


                }
            }
            return Ok(walkinDataList);
        }
    }


}

