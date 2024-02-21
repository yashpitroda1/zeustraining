using System;
using System.ComponentModel.DataAnnotations;

namespace quantum_apis.models
{
    public class LoginReqDTO
    {
        [Required]
        public string userEmail { get; set; }
        [Required]
        public string password { get; set; }
        [Required]
        public bool isRememberMe { get; set; }
        public string role { get; set; }

    }
}

