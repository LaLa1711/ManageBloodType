using ManageBloodTypes.DBContext;
using ManageBloodTypes.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ManageBloodTypes.Controllers
{
    public class EditController : Controller
    {
        // GET: Edit
        private readonly QLMauEntities _db = new QLMauEntities();

        public ActionResult Index()
        {
            string Gmail = Session["UserEmail"] as string;
            if (string.IsNullOrEmpty(Gmail))
            {
                return RedirectToAction("Index", "Home");
            }

            var thongTinCaNhan = _db.tbThongTinCaNhans.FirstOrDefault(x => x.Gmail == Gmail);

            if (thongTinCaNhan == null)
            {
                return RedirectToAction("Create");
            }

            var model = new ThongTinCaNhanModels
            {
                HoTen = thongTinCaNhan.HoTen,
                GioiTinh = thongTinCaNhan.GioiTinh,
                NgaySinh = thongTinCaNhan.NgaySinh,
                DiaChi = thongTinCaNhan.DiaChi,
                IDNhomMau = thongTinCaNhan.IDNhomMau
            };

            return View(model);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Update(ThongTinCaNhanModels model)
        {
            if (!ModelState.IsValid)
            {
                return View("Index", model);
            }

            try
            {
                string Gmail = Session["UserEmail"] as string;
                if (string.IsNullOrEmpty(Gmail))
                {
                    return RedirectToAction("Index", "Home");
                }
                var thongTinCaNhan = _db.tbThongTinCaNhans.FirstOrDefault(x => x.Gmail == Gmail);

                if (thongTinCaNhan == null)
                {
                    return RedirectToAction("Create");
                }

                thongTinCaNhan.HoTen = model.HoTen;
                thongTinCaNhan.GioiTinh = model.GioiTinh;
                thongTinCaNhan.NgaySinh = model.NgaySinh;
                thongTinCaNhan.DiaChi = model.DiaChi;
                thongTinCaNhan.IDNhomMau = model.IDNhomMau;

                _db.SaveChanges();

                TempData["SuccessMessage"] = "Cập nhật thông tin cá nhân thành công.";
                return RedirectToAction("Index");
            }
            catch (Exception ex)
            {
                TempData["ErrorMessage"] = "Đã xảy ra lỗi trong quá trình cập nhật thông tin. Vui lòng thử lại.";
                Console.WriteLine(ex.Message);
                return View("Index", model);
            }
        }

     
        public ActionResult Create()
        {
            return View(new ThongTinCaNhanModels());
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(ThongTinCaNhanModels model)
        {
            if (!ModelState.IsValid)
            {
                return View(model);
            }

            try
            {
                string Gmail = Session["UserEmail"] as string;
                if (string.IsNullOrEmpty(Gmail))
                {
                    return RedirectToAction("Index", "Home");
                }

                var existingRecord = _db.tbThongTinCaNhans.FirstOrDefault(x => x.Gmail == Gmail);
                if (existingRecord != null)
                {
                    TempData["ErrorMessage"] = "Thông tin cá nhân đã tồn tại.";
                    return View(model);
                }

                var thongTinCaNhan = new tbThongTinCaNhan
                {
                    Gmail = Gmail,
                    HoTen = model.HoTen,
                    GioiTinh = model.GioiTinh,
                    NgaySinh = model.NgaySinh,
                    DiaChi = model.DiaChi,
                    IDNhomMau = model.IDNhomMau
                };

                _db.tbThongTinCaNhans.Add(thongTinCaNhan);
                _db.SaveChanges();

                TempData["SuccessMessage"] = "Thêm thông tin cá nhân thành công.";
                return RedirectToAction("Index");
            }
            catch (Exception ex)
            {
                TempData["ErrorMessage"] = "Đã xảy ra lỗi trong quá trình thêm thông tin. Vui lòng thử lại.";
                Console.WriteLine(ex.Message);
                return View(model);
            }
        }

    }
}