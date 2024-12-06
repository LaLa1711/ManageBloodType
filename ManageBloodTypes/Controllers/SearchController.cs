using ManageBloodTypes.DBContext;
using ManageBloodTypes.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ManageBloodTypes.Controllers
{
    public class SearchController : Controller
    {
        private QLMauEntities db = new QLMauEntities();

        // GET: Search
        public ActionResult Index()
        {
            // Lấy email của người dùng từ session
            string Gmail = Session["UserEmail"] as string;

            // Kiểm tra nếu không có email, điều hướng về trang chủ
            if (string.IsNullOrEmpty(Gmail))
            {
                return RedirectToAction("Index", "Home");
            }

            // Lấy thông tin người dùng từ cơ sở dữ liệu
            var user = db.tbThongTinCaNhans
                         .Where(u => u.Gmail == Gmail)
                         .Select(ab => new ThongTinCaNhanModels
                         {
                             MaTaiKhoan = ab.MaTaiKhoan,
                             Gmail = ab.Gmail,
                             HinhAnh = ab.HinhAnh,
                             HoTen = ab.HoTen,
                             GioiTinh = ab.GioiTinh,
                             NgaySinh = ab.NgaySinh,
                             DiaChi = ab.DiaChi,
                             IDThanhPho = ab.IDThanhPho,
                             IDQuan = ab.IDQuan,
                             IDPhuong = ab.IDPhuong,
                             NgheNghiep = ab.NgheNghiep,
                             TinhTrangHonNhan = ab.TinhTrangHonNhan,
                             CCCD = ab.CCCD,
                             NgayCap = ab.NgayCap,
                             NoiCap_IDTP = ab.NoiCap_IDTP,
                             IDNhomMau = ab.IDNhomMau,
                             SDT = ab.SDT
                         })
                         .FirstOrDefault();

            // Nếu không tìm thấy người dùng với email đó, chuyển hướng đến trang "not-found"
            if (user == null)
            {
                return Redirect("/not-found");
            }

            // Trả về View và truyền thông tin người dùng vào View
            return View(user);
        }

        // Phương thức lấy danh sách Thành Phố
        public string GetThanhPho(int? id)
        {
            string html = "";
            List<ThanhPhoModel> lst = db.tbTinhThanhPhoes
                .Where(grpo => grpo.Hide != true)
                .Select(grpo => new ThanhPhoModel
                {
                    Id = grpo.IDTP,
                    Name = grpo.TenTP
                }).ToList();

            if (id != null)
            {
                html = "<option value= ''> ----- Chọn -----</option>";
                foreach (var item in lst)
                {
                    html += item.Id == id
                        ? $"<option selected value='{item.Id}'>{item.Name}</option>"
                        : $"<option value='{item.Id}'>{item.Name}</option>";
                }
            }
            else
            {
                html = "<option selected value= ''> ----- Chọn -----</option>";
                foreach (var item in lst)
                {
                    html += $"<option value='{item.Id}'>{item.Name}</option>";
                }
            }
            return html;
        }

        // Phương thức lấy danh sách Quận
        public string GetDanhSachQuan(int? idThanhPho, int? idQuan)
        {
            string html = "<option value=''>----- Chọn Quận/Huyện -----</option>";
            if (idThanhPho == null)
            {
                return html;
            }

            var lstQuan = db.tbQuanHuyens
                .Where(qh => qh.Hide != true && qh.IDTP == idThanhPho)
                .Select(qh => new QuanHuyenModel
                {
                    IDQuan = qh.IDQuan,
                    TenQuan = qh.TenQuan
                }).ToList();

            foreach (var qh in lstQuan)
            {
                html += qh.IDQuan == idQuan
                    ? $"<option selected value='{qh.IDQuan}'>{qh.TenQuan}</option>"
                    : $"<option value='{qh.IDQuan}'>{qh.TenQuan}</option>";
            }

            return html;
        }

        // Phương thức lấy danh sách Phường
        public string GetDanhSachPhuong(int? idPhuong, int? idQuan)
        {
            string html = "<option value=''>----- Chọn Phường/Xã -----</option>";
            if (idQuan == null)
            {
                return html;
            }

            var lstPhuong = db.tbXaPhuongs
                .Where(qh => qh.Hide != true && qh.IDQuan == idQuan)
                .Select(qh => new PhuongXaModel
                {
                    IDPhuong = qh.IDPhuong,
                    TenPhuong = qh.TenPhuong
                }).ToList();

            foreach (var qh in lstPhuong)
            {
                html += qh.IDPhuong == idPhuong
                    ? $"<option selected value='{qh.IDPhuong}'>{qh.TenPhuong}</option>"
                    : $"<option value='{qh.IDPhuong}'>{qh.TenPhuong}</option>";
            }

            return html;
        }

        // Phương thức tìm kiếm người dùng theo Thành Phố, Quận, Phường
        public ActionResult SearchUsers(int? idThanhPho, int? idQuan, int? idPhuong)
        {
            var query = db.tbThongTinCaNhans.AsQueryable();

            if (idThanhPho.HasValue)
            {
                query = query.Where(u => u.IDThanhPho == idThanhPho.Value);
            }

            if (idQuan.HasValue)
            {
                query = query.Where(u => u.IDQuan == idQuan.Value);
            }

            if (idPhuong.HasValue)
            {
                query = query.Where(u => u.IDPhuong == idPhuong.Value);
            }

            var users = query
                .Select(ab => new ThongTinCaNhanModels
                {
                    MaTaiKhoan = ab.MaTaiKhoan,
                    Gmail = ab.Gmail,
                    HinhAnh = ab.HinhAnh,
                    HoTen = ab.HoTen,
                    GioiTinh = ab.GioiTinh,
                    NgaySinh = ab.NgaySinh,
                    DiaChi = ab.DiaChi,
                    IDThanhPho = ab.IDThanhPho,
                    IDQuan = ab.IDQuan,
                    IDPhuong = ab.IDPhuong,
                    NgheNghiep = ab.NgheNghiep,
                    TinhTrangHonNhan = ab.TinhTrangHonNhan,
                    CCCD = ab.CCCD,
                    NgayCap = ab.NgayCap,
                    NoiCap_IDTP = ab.NoiCap_IDTP,
                    IDNhomMau = ab.IDNhomMau,
                    SDT = ab.SDT
                })
                .ToList();

            return Json(users, JsonRequestBehavior.AllowGet);
        }
    }
}
