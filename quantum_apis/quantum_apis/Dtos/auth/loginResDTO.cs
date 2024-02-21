using System;
namespace quantum_apis.models
{
    public class LoginResDTO
    {
       public int id { get; set; }
        public string userEmail { get; set; }
        public string token { get; set; }
        public DateTime tokenExpiresAt { get; set; }
        public string role { get; set; }

    }
}

