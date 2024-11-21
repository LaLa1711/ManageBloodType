using ManageBloodTypes.DBContext;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ManageBloodTypes.Controllers
{
    public class LoginController : Controller
    {
        // GET: Login
        private QLMauEntities db = new QLMauEntities();

        [HttpGet]
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Index(string Gmail, string MatKhau)
        {
            // Kiểm tra nếu người dùng bỏ trống thông tin
            if (string.IsNullOrWhiteSpace(Gmail) || string.IsNullOrWhiteSpace(MatKhau))
            {
                if (string.IsNullOrWhiteSpace(Gmail))
                {
                    ViewBag.EmailError = "Vui lòng nhập email.";
                }

                if (string.IsNullOrWhiteSpace(MatKhau))
                {
                    ViewBag.PasswordError = "Vui lòng nhập mật khẩu.";
                }

                return View();
            }

            // Kiểm tra email trong cơ sở dữ liệu
            var user = db.tbThongTinCaNhans.FirstOrDefault(u => u.Gmail == Gmail);

            if (user == null)
            {
                // Email không tồn tại
                ViewBag.EmailError = "Email không tồn tại.";
                return View();
            }

            // Kiểm tra mật khẩu và id
            if (user.MatKhau != MatKhau)
            {
                ViewBag.PasswordError = "Mật khẩu không đúng.";
                return View();
            }

            // Đăng nhập thành công, chuyển hướng đến Dashboard
            return RedirectToAction("Index", "HomePage");
        }

    }
}