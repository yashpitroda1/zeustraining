using System;
namespace quantum_apis.models
{
    public class WalkinApplyReqDTO
    {
        required
        public int userId
        { get; set; }

        required
         public int walkinId
        { get; set; }
        required
               public int selectedTimeslotId
        { get; set; }
        required public List<int> walkinJobRoleId { get; set; }
        public DateTime? dateCreated { get; set; }
        public DateTime? dateUpdated { get; set; }
    }

    public class WalkinApplyResDTO
    {
        public string status { get; set; }

        public int userApplicationId { get; set; }

        public int selectedTimeslotId { get; set; }
        public int userId { get; set; }
        public int walkinId { get; set; }

    }
}

