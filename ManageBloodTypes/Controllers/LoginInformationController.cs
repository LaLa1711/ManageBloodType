using ManageBloodTypes.DBContext;
using ManageBloodTypes.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ManageBloodTypes.Controllers
{
    public class LoginInformationController : Controller
    {
        QLMauEntities db = new QLMauEntities();
        // GET: LoginInformation
        public ActionResult Index()
        {
            try
            {
                string Gmail = Session["UserEmail"] as string;
                if (string.IsNullOrEmpty(Gmail))
                {
                    return RedirectToAction("Index", "Home"); 
                }
                var user = db.tbThongTinCaNhans
                             .Where(u => u.Gmail == Gmail)
                             .Select(ab => new ThongTinCaNhanModels
                             {
                                 Gmail = ab.Gmail,
                                 SDT = ab.SDT,
                                 MatKhau = ab.MatKhau,
                             })
                             .FirstOrDefault();

                if (user == null)
                {
                    return Redirect("/not-found");
                }
                if (string.IsNullOrEmpty(user.SDT))
                {
                    user.SDT = "(Chưa có thông tin)";
                }
                else
                {
                    user.SDT = $"{user.SDT.Substring(0, 3)}****{user.SDT.Substring(user.SDT.Length - 3)}";
                }
                if (!string.IsNullOrEmpty(user.MatKhau))
                {
                    user.MatKhau = new string('*', user.MatKhau.Length);
                }
                return PartialView(user);
            }
            catch (Exception ex)
            {
                return Redirect("/not-found");
            }
        }
    }
}