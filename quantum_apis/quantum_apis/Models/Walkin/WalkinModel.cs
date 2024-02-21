using System;
using quantum_apis.Models.Walkin;

namespace quantum_apis.Models
{
	public class WalkinModel
	{
     
        public int id { get; set; }
        public string walkinTitle { get; set; }
        public string? walkinNotes { get; set; }
        public DateTime walkinStartingDate { get; set; }
        public DateTime walkinEndingDate { get; set; }
        public WalkinAddressModel walkinAddress { get; set; }
        public string walkinCity { get; set; }
        public List<string> walkinThingsToRemember { get; set; }

        public WalkinInstructionModel walkinInstruction { get; set; }
        public List<WalkinJobRoleModel> walkinJobRole { get; set; }
        public List<WalkinTimeSlotModel> walkinTimeSlot { get; set; }


    }
    public class WalkinAddressModel
    {
        public string phone { get; set; }
        public string city { get; set; }
        public string address { get; set; }
        public string pinCode { get; set; }
        public string landmark { get; set; }
        public string companyName { get; set; }

    }
}

