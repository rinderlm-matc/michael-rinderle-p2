using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SecurePass.Library.Entity
{
    public class Storage
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Guid { get; set; }
        public bool Batch { get; set; }
        public int BatchId { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public bool IsPasswordProtected { get; set; }
        public string ProtectedPassword { get; set; }
        public string Note { get; set; }
        public bool Confirmation { get; set; } 
        public string Email { get; set; }
        public DateTime DateCreated { get; set; }
    }
}