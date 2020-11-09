using SecurePass.Library.Entity;
using System;
using System.Net.Mail;

namespace SecurePass.Providers
{
    public static class MailServiceProvider
    {

        public static string EmailFrom = string.Empty;
        public static string Username = string.Empty;
        public static string Password = string.Empty;

        public static void InitCredentials()
        {
            Console.WriteLine("Enter EmailFrom");
            EmailFrom = Console.ReadLine();
            Console.WriteLine("Enter Username");
            Username = Console.ReadLine();
            Console.WriteLine("Enter Password");
            Password = Console.ReadLine();
        }

        public static bool SendConfirmation(Storage storage)
        {
            try
            {
                MailMessage msg = new MailMessage();
                msg.To.Add(new MailAddress(storage.Email, "Recipient"));
                msg.From = new MailAddress(EmailFrom, "SecurePass MX Server");
                msg.Subject = "SecurePass Confirmation Note";
                msg.Body = $"The credential [{storage.Guid}] has been read and destroyed.";
                msg.IsBodyHtml = true;

                SmtpClient client = new SmtpClient();
                client.UseDefaultCredentials = false;
                client.Credentials = new System.Net.NetworkCredential(Username, Password);
                client.Port = 587;
                client.Host = "smtp.office365.com";
                client.DeliveryMethod = SmtpDeliveryMethod.Network;
                client.EnableSsl = true;
                try
                {
                    client.Send(msg);
                }
                catch (Exception ex)
                {
                    return false;
                }
                return true;
            }
            catch(Exception ex)
            {
                System.Diagnostics.Debug.WriteLine(ex);
                return false;
            }
        }
    }
}
