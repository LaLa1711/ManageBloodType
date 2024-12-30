using System;
using System.Collections.Generic;
using System.Diagnostics.Contracts;
using System.Drawing;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ManageBloodTypes.DBContext;
using ManageBloodTypes.Models;


namespace ManageBloodTypes.Controllers
{
    public class HomeController : Controller
    {
        private QLMauEntities db = new QLMauEntities();

        [HttpGet]
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Index(string Gmail, string MatKhau)
        {
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

            var user = db.tbThongTinCaNhans.FirstOrDefault(u => u.Gmail == Gmail);

            if (user == null)
            {
                ViewBag.EmailError = "Email không tồn tại.";
                return View();
            }

            if (user.MatKhau != MatKhau)
            {
                ViewBag.PasswordError = "Mật khẩu không đúng.";
                return View();
            }
            if (/*Gmail.Trim().ToLower() == "bacsi123@gmail.com" && MatKhau.Trim() == "Bacsi123"*/ user.Role == 2)
            {
                Session["HinhAnh"] = user.HinhAnh;
                Session["UserEmail"] = user.Gmail;
                Session["MaTaiKhoan"] = user.MaTaiKhoan;
                Session["HoTen"] = user.HoTen;
                return RedirectToAction("Index", "Doctor");
            }
            if (/*Gmail.Trim().ToLower() == "admin123@gmail.com" && MatKhau.Trim() == "Admin123"*/ user.Role == 1)
            {
                Session["HinhAnh"] = user.HinhAnh;
                Session["UserEmail"] = user.Gmail;
                Session["MaTaiKhoan"] = user.MaTaiKhoan;
                Session["HoTen"] = user.HoTen;
                return RedirectToAction("Index", "Home", new { area = "Admin" });
            }
            Session["UserEmail"] = user.Gmail;
            Session["HoTen"] = user.HoTen;
            return RedirectToAction("Home", "HomePage");
        }

        public ActionResult Logout()
        {
            Session.Clear();
            return RedirectToAction("Index", "Home"); 
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}