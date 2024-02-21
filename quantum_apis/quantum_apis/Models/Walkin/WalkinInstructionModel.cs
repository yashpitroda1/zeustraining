using System;
namespace quantum_apis.Models.Walkin
{
    public class WalkinInstructionModel
	{
        public List<string> generalInstructions { get; set; }
        public List<string> examInstructions { get; set; }
        public List<string> systemRequirements { get; set; }
        public RecruitmentProcessModel processDetails { get; set; }
    }

    class RecruitmentProcessModelWrapper
    {
        public RecruitmentProcessModel process { get; set; }
        //RecruitmentProcessModelWrapper= {process:{}}
        //process={rounds:[{},{}],processInstruction:["",""]} -- RecruitmentProcessModel type

    }

    public class RecruitmentProcessModel
    {
        public List<RecruitmentRoundModel> Rounds { get; set; }
        public List<string> ProcessInstruction { get; set; }

        //public RecruitmentProcessModel()
        //{
        //    Rounds = new List<RecruitmentRoundModel>();
        //    ProcessInstructions = new List<string>();
        //}
    }

    public class RecruitmentRoundModel
    {
        public string RoundNo { get; set; }
        public string RoundDate { get; set; }
        public string RoundTitle { get; set; }
    }
}

