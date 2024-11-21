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
    public class RegisterController : Controller
    {
        QLMauEntities db = new QLMauEntities();
        // GET: Register
        public ActionResult Index()
        {
            return View();
        }
        [HttpPost]
        public ActionResult Index(RegisterModel tbTTin)
        {
            try
            {
                var Register = new tbThongTinCaNhan
                {
                    HoTen = tbTTin.HoTen,
                    Gmail = tbTTin.Gmail,
                    MatKhau = tbTTin.MatKhau,
                    Hide = false,
                };
                db.tbThongTinCaNhans.Add(Register);
                db.SaveChanges();
                return Redirect("/Home/Index");
            }
            catch
            {
                return View(tbTTin);


            }

        }
        [HttpPost]
        public JsonResult GetJson(tbThongTinCaNhan obj)
        {
            tbThongTinCaNhan user = new tbThongTinCaNhan();
            try
            {
                user = new tbThongTinCaNhan
                {
                    HoTen = obj.HoTen,
                    Gmail = obj.Gmail,
                    MatKhau = obj.MatKhau,
                    Hide = obj.Hide
                };
                db.tbThongTinCaNhans.Add(user);
                db.SaveChanges();
            }
            catch
            {
                user = new tbThongTinCaNhan();
            }
            return Json(user, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult CheckAccountExist1(string email)
        {
            bool exists = db.tbThongTinCaNhans.Any(u => u.Gmail == email);

            if (exists)
            {
                return Json(new { success = false, message = "Email này đã tồn tại" });
            }
            else
            {
                return Json(new { success = true, message = "Email hợp lệ" });
            }
        }




    }
}