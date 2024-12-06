using ManageBloodTypes.DBContext;
using ManageBloodTypes.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.IO;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using ManageBloodTypes.App_Start;
using Microsoft.VisualBasic.Logging;

namespace ManageBloodTypes.Controllers
{
    public class GeneralInformationController : Controller
    {
        // GET: GeneralInformation
        private QLMauEntities db = new QLMauEntities();
        #region -- Xử Lý File Upload
        #region -- Upload
        private string pathFile = "/files/aboutus/" + DateTime.Now.Year + "/" + DateTime.Now.Month + "/";
        private string fileName = "";
        public string UploadImage(HttpPostedFileBase upload)
        {
            fileName = Path.GetFileName(upload.FileName);
            fileName = Processing.UrlImages(fileName);
            bool exsits = System.IO.Directory.Exists(Server.MapPath(pathFile));
            if (!exsits)
                System.IO.Directory.CreateDirectory(Server.MapPath(pathFile));
            var path = Path.Combine(Server.MapPath(pathFile), fileName);
            upload.SaveAs(path);
            return pathFile + fileName;
        }
        #endregion

        #endregion
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
                                 IDNhomMau = ab.IDNhomMau
                             })
                             .FirstOrDefault();

                if (user == null)
                {
                    return Redirect("/not-found"); // Trường hợp không tìm thấy người dùng
                }
                if (string.IsNullOrEmpty(user.HoTen))
                {
                    user.HoTen = "(Chưa có thông tin)"; 
                }
                if (user.GioiTinh == null)
                {
                    user.GioiTinhDisplay = "(Chưa có thông tin)"; // Trường hợp chưa nhập
                }
                else if (user.GioiTinh == true)
                {
                    user.GioiTinhDisplay = "Nam"; // True tương ứng với Nam
                }
                else
                {
                    user.GioiTinhDisplay = "Nữ"; // False tương ứng với Nữ
                }
                if (user.NgaySinh == null)
                {
                    user.NgaySinhDisplay = "--/--/----"; // Nếu không có ngày sinh
                }
                else
                {
                    user.NgaySinhDisplay = user.NgaySinh.Value.ToString("dd/MM/yyyy"); // Nếu có ngày sinh, định dạng theo DD/MM/YYYY
                }
                if (string.IsNullOrEmpty(user.DiaChi))
                {
                    user.DiaChi = "(Chưa có thông tin)"; // Nếu không có số điện thoại
                }
                if (!user.IDPhuong.HasValue || user.IDPhuong.Value == 0)
                {
                    user.IDPhuong = null; // Nếu không có nghề nghiệp, gán là null
                }
                if (!user.IDQuan.HasValue || user.IDQuan.Value == 0)
                {
                    user.IDQuan = null; // Nếu không có nghề nghiệp, gán là null
                }
                if (!user.IDThanhPho.HasValue || user.IDThanhPho.Value == 0)
                {
                    user.IDThanhPho = null; // Nếu không có nghề nghiệp, gán là null
                }
                if (!user.NgheNghiep.HasValue || user.NgheNghiep.Value == 0)
                {
                    user.NgheNghiep = null; // Nếu không có nghề nghiệp, gán là null
                }
                if (user.TinhTrangHonNhan == null)
                {
                    user.TinhTrangHonNhanDisplay = "(Chưa có thông tin)"; // Trường hợp chưa nhập
                }
                else if (user.TinhTrangHonNhan == true)
                {
                    user.TinhTrangHonNhanDisplay = "Độc Thân"; // True tương ứng với Nam
                }
                else
                {
                    user.TinhTrangHonNhanDisplay = "Đã Kết Hôn"; // False tương ứng với Nữ
                }

                if (!string.IsNullOrEmpty(user.CCCD))
                {
                    user.CCCD = new string('*', user.CCCD.Length);
                }
                else
                {
                    user.CCCD = "(Chưa có thông tin)";
                }
                if (user.NgayCap == null)
                {
                    user.NgayCapDisplay = "--/--/----"; // Nếu không có ngày sinh
                }
                else
                {
                    user.NgayCapDisplay = user.NgayCap.Value.ToString("dd/MM/yyyy"); // Nếu có ngày sinh, định dạng theo DD/MM/YYYY
                }
                if (!user.NoiCap_IDTP.HasValue || user.NoiCap_IDTP.Value == 0)
                {
                    user.NoiCap_IDTP = null; // Nếu không có nghề nghiệp, gán là null
                }
                if (!user.IDNhomMau.HasValue || user.IDNhomMau.Value == 0)
                {
                    user.IDNhomMau = null; // Nếu không có nghề nghiệp, gán là null
                }


                // Trả về partial view với dữ liệu của người dùng
                return PartialView(user);
            }
            catch (Exception ex)
            {
                // Log lỗi nếu cần thiết (không nên trả exception ra giao diện)
                return Redirect("/not-found");
            }
        }


        public ActionResult Edit(tbThongTinCaNhan tbAbo, HttpPostedFileBase Editfile)
        {
            try
            {
                string Gmail = Session["UserEmail"] as string;
                if (string.IsNullOrEmpty(Gmail))
                {
                    return RedirectToAction("Index", "Home");  // Trường hợp không có Gmail trong session
                }

                var user = db.tbThongTinCaNhans.FirstOrDefault(u => u.Gmail == Gmail);
                if (user == null)
                {
                    return RedirectToAction("Index", "Home");  // Nếu không tìm thấy người dùng
                }

                // Cập nhật thông tin
                if (Editfile != null)
                {
                    string uploadedImage = UploadImage(Editfile);
                    if (!string.IsNullOrEmpty(uploadedImage))
                    {
                        user.HinhAnh = uploadedImage;
                    }
                }

                // Cập nhật thông tin
                user.HoTen = tbAbo.HoTen;
                user.GioiTinh = tbAbo.GioiTinh;
                user.NgaySinh = tbAbo.NgaySinh;
                user.DiaChi = tbAbo.DiaChi;
                // (Tiếp tục cập nhật các trường khác)

                db.Entry(user).State = EntityState.Modified;
                db.SaveChanges();

                return RedirectToAction("HomePage", "Index");  // Sau khi lưu, chuyển hướng đến trang khác
            }
            catch (Exception ex)
            {
                // Ghi log hoặc xử lý lỗi
                ModelState.AddModelError("", "Có lỗi xảy ra khi cập nhật thông tin: " + ex.Message);
                return View(tbAbo);
            }
        }

    }
}