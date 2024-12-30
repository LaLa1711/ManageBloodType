using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Net;
using System.Web;
using System.Web.Mvc;
using ManageBloodTypes.DBContext;
using OfficeOpenXml.FormulaParsing.Excel.Functions.Logical;
using System.Threading;
using System.Configuration;

namespace ManageBloodTypes.Controllers
{
    public class ForgotPasswordController : Controller
    {
        QLMauEntities db = new QLMauEntities();

        public ActionResult Index()
        {
            return View();
        }
        public ActionResult PasswordSent()
        {
            return View();
        }
        public ActionResult ForgotPassword()
        {
            return View();
        }

        // POST: ForgotPassword
        [HttpPost]
        public ActionResult ForgotPassword(string aliasname, string captcha)
        {
            if (string.IsNullOrEmpty(aliasname) || string.IsNullOrEmpty(captcha))
            {
                return View("Index"); // Return lại view nếu có lỗi
            }

            // Kiểm tra CAPTCHA (nếu có)
            if (!ValidateCaptcha(captcha))
            {
                ModelState.AddModelError("Captcha", "Mã kiểm tra không đúng.");
                return View("Index");
            }

            // Kiểm tra sự tồn tại của email
            var user = db.tbThongTinCaNhans.FirstOrDefault(u => u.Gmail == aliasname);
            if (user == null)
            {
                ModelState.AddModelError("AliasName", "Email này không tồn tại.");
                return View("Index");
            }

            // Tạo mật khẩu mới ngẫu nhiên
            string newPassword = GenerateNewPassword();

            // Cập nhật mật khẩu mới vào cơ sở dữ liệu
            user.MatKhau = newPassword;
            db.SaveChanges();

            // Gửi mật khẩu mới qua email
            SendNewPasswordEmail(user.Gmail, newPassword);

            return View("PasswordSent"); // Chuyển đến trang thông báo mật khẩu đã được gửi
        }

        private bool ValidateCaptcha(string captcha)
        {
            // Kiểm tra mã CAPTCHA ở đây
            return true; // Giả sử mã CAPTCHA hợp lệ
        }

        private string GenerateNewPassword()
        {
            var random = new Random();
            var length = 8;
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            return new string(Enumerable.Range(0, length).Select(_ => chars[random.Next(chars.Length)]).ToArray());
        }

        private void SendNewPasswordEmail(string toEmail, string newPassword)
        {
            //var fromEmail = new MailAddress("cqt17112003@gmail.com", "Managemeny");
            //var toEmailAddress = new MailAddress(toEmail);
            //var password = "7577 9457"; // Mật khẩu ứng dụng mà bạn đã tạo (nếu sử dụng xác thực 2 bước)

            //var smtp = new SmtpClient
            //{
            //    Host = "smtp.gmail.com",  // Địa chỉ máy chủ SMTP của Gmail
            //    Port = 587,               // Cổng sử dụng STARTTLS
            //    EnableSsl = true,         // Bật SSL/TLS để Gmail yêu cầu STARTTLS

            //};
            //NetworkCredential nc = new NetworkCredential(fromEmail.Address, password);
            //smtp.Credentials = nc;
            //smtp.UseDefaultCredentials = true;

            //MailMessage message = new MailMessage(fromEmail, toEmailAddress);

            //message.Subject = "Mật khẩu mới của bạn";
            //message.Body = $"Mật khẩu mới của bạn là: {newPassword}";
            //message.IsBodyHtml = false;


            //try
            //{
            //    smtp.Send(message); // Gửi email
            //}
            //catch (Exception ex)
            //{
            //    Console.WriteLine("Lỗi khi gửi email: " + ex.Message);
            //}
            SendMail("SucKhoeSmart", "Mật khẩu mới của bạn", newPassword, toEmail, "cqt17112003@gmail.com");

        }
        public bool SendMail(string name, string subject, string content,
            string toMail, string formmail)
        {
            bool rs = false;
            try
            {
                MailMessage message = new MailMessage();
                var smtp = new SmtpClient();
                {
                    smtp.Host = "smtp.gmail.com"; //host name
                    smtp.Port = 587; //port number
                    smtp.EnableSsl = true; //whether your smtp server requires SSL
                    smtp.DeliveryMethod = System.Net.Mail.SmtpDeliveryMethod.Network;
                    smtp.UseDefaultCredentials = false;
                    smtp.Credentials = new NetworkCredential()
                    {
                        UserName = formmail,
                        Password = "svzb wljh lnfe pzja"
                    };
                }
                MailAddress fromAddress = new MailAddress(formmail, name);
                message.From = fromAddress;
                message.To.Add(toMail);
                message.Subject = subject;
                message.IsBodyHtml = true;
                message.Body = content;
                smtp.Send(message);
                rs = true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                rs = false;
            }
            return rs;
        }
    }
}