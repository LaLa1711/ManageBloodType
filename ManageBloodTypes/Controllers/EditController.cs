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
        private readonly QLMauEntities _db = new QLMauEntities(); // Thay bằng DbContext thực tế của bạn

        public ActionResult Index()
        {
            // Lấy thông tin cá nhân của người dùng hiện tại
            string Gmail = Session["UserEmail"] as string;
            if (string.IsNullOrEmpty(Gmail))
            {
                return RedirectToAction("Index", "Home");
            }

            var thongTinCaNhan = _db.tbThongTinCaNhans.FirstOrDefault(x => x.Gmail == Gmail);

            if (thongTinCaNhan == null)
            {
                // Nếu không có thông tin cá nhân, chuyển hướng tới trang tạo mới
                return RedirectToAction("Create");
            }

            // Truyền dữ liệu qua View
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

        // POST: ThongTinCaNhan/Update
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Update(ThongTinCaNhanModels model)
        {
            if (!ModelState.IsValid)
            {
                // Nếu dữ liệu không hợp lệ, trả lại trang chỉnh sửa
                return View("Index", model);
            }

            try
            {
                // Lấy thông tin cá nhân từ database theo Gmail
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

                // Cập nhật thông tin từ model vào đối tượng cơ sở dữ liệu
                thongTinCaNhan.HoTen = model.HoTen;
                thongTinCaNhan.GioiTinh = model.GioiTinh;
                thongTinCaNhan.NgaySinh = model.NgaySinh;
                thongTinCaNhan.DiaChi = model.DiaChi;
                thongTinCaNhan.IDNhomMau = model.IDNhomMau;

                // Lưu thay đổi vào cơ sở dữ liệu
                _db.SaveChanges();

                // Thông báo thành công
                TempData["SuccessMessage"] = "Cập nhật thông tin cá nhân thành công.";
                return RedirectToAction("Index");
            }
            catch (Exception ex)
            {
                // Log lỗi nếu có
                TempData["ErrorMessage"] = "Đã xảy ra lỗi trong quá trình cập nhật thông tin. Vui lòng thử lại.";
                Console.WriteLine(ex.Message);
                return View("Index", model);
            }
        }

        // GET: ThongTinCaNhan/Create
        public ActionResult Create()
        {
            // Trả về view tạo mới
            return View(new ThongTinCaNhanModels());
        }

        // POST: ThongTinCaNhan/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(ThongTinCaNhanModels model)
        {
            if (!ModelState.IsValid)
            {
                // Nếu dữ liệu không hợp lệ, trả lại trang tạo mới
                return View(model);
            }

            try
            {
                // Lấy Gmail của người dùng hiện tại
                string Gmail = Session["UserEmail"] as string;
                if (string.IsNullOrEmpty(Gmail))
                {
                    return RedirectToAction("Index", "Home");
                }

                // Kiểm tra xem thông tin cá nhân đã tồn tại chưa
                var existingRecord = _db.tbThongTinCaNhans.FirstOrDefault(x => x.Gmail == Gmail);
                if (existingRecord != null)
                {
                    TempData["ErrorMessage"] = "Thông tin cá nhân đã tồn tại.";
                    return View(model);
                }

                // Tạo mới đối tượng tbThongTinCaNhan từ model
                var thongTinCaNhan = new tbThongTinCaNhan
                {
                    Gmail = Gmail,
                    HoTen = model.HoTen,
                    GioiTinh = model.GioiTinh,
                    NgaySinh = model.NgaySinh,
                    DiaChi = model.DiaChi,
                    IDNhomMau = model.IDNhomMau
                };

                // Thêm vào cơ sở dữ liệu
                _db.tbThongTinCaNhans.Add(thongTinCaNhan);
                _db.SaveChanges();

                // Thông báo thành công
                TempData["SuccessMessage"] = "Thêm thông tin cá nhân thành công.";
                return RedirectToAction("Index");
            }
            catch (Exception ex)
            {
                // Log lỗi nếu có
                TempData["ErrorMessage"] = "Đã xảy ra lỗi trong quá trình thêm thông tin. Vui lòng thử lại.";
                Console.WriteLine(ex.Message);
                return View(model);
            }
        }

    }
}