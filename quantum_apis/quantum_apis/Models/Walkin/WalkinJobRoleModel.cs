using System;
namespace quantum_apis.Models.Walkin
{
	public class WalkinJobRoleModel
	{
        public int walkinJobRoleId { get; set; }
        public int enumJobRoleId { get; set; }
        public string roleName { get; set; } 
        public string grossCompensationPackage { get; set; }
        public List<string> roleDescription { get; set; }
        public List<string> requirements { get; set; }
    }
}

