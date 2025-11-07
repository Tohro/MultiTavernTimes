using System.Security.Cryptography;
using System.Text;

namespace MTT.API.Models;

//ЭТО БАЗА ПОНИМАЕШЬ!?
public class LoginHashDto
{
    public string EmailHash { get; set; }
    public string PasswordHash { get; set; }
    
    public static string ComputeSha256(string input)
         {
             using var sha = SHA256.Create();
             var bytes = Encoding.UTF8.GetBytes(input);
             var hash = sha.ComputeHash(bytes);
             return string.Concat(hash.Select(b => b.ToString("x2")));
             //return Convert.ToHexString(hash).ToLower();
         }
}

public static class AdminCredentials
{
    public const string EmailHash = "258d8dc916db8cea2cafb6c3cd0cb0246efe061421dbd83ec3a350428cabda4f"; // пример: hash("admin@example.com")
    public const string PasswordHash = "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8"; // пример: hash("password")
}

