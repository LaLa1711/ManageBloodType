﻿using ManageBloodTypes.App_Start;
using ManageBloodTypes.DBContext;
using ManageBloodTypes.Models;
using Microsoft.VisualBasic.ApplicationServices;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ManageBloodTypes.Controllers
{
    public class HomePageController : Controller
    {
        // GET: HomePage
        QLMauEntities db = new QLMauEntities();
        #region -- Xử Lý File Upload
        #region -- Upload
        private string pathFile = "/files/user/" + DateTime.Now.Year + "/" + DateTime.Now.Month + "/";
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


        public string GetNgheNghiep(int? id)
        {
            string html = "";

            List<NgheNghiepModel> lst = new List<NgheNghiepModel>();
            lst = (from grpo in db.tbNgheNghieps
                   where grpo.Hide != true
                   select (new NgheNghiepModel
                   {
                       Id = grpo.IDNgheNghiep,
                       Name = grpo.TenNgheNghiep

                   })).ToList();
            int tong = lst.Count;

            if (id != null)
            {
                html = "<option value= ''> ----- Chọn -----</option>";
                for (int i = 0; i < tong; i++)
                {
                    if (id == lst[i].Id)
                    {
                        html += "<option selected value='" + lst[i].Id + "'>" + lst[i].Name + "</option>";
                    }
                    else
                    {
                        html += "<option value='" + lst[i].Id + "'>" + lst[i].Name + "</option>";

                    }
                }
            }
            else
            {
                html = "<option selected value= ''> ----- Chọn -----</option>";
                for (int i = 0; i < tong; i++)
                {
                    html += "<option value='" + lst[i].Id + "'>" + lst[i].Name + "</option>";
                }
            }
            return html;

        }
        public String GetNgheNghiepName(int id)

        {
            try
            {
                return db.tbNgheNghieps.Find(id).TenNgheNghiep;
            }
            catch
            {
                return "";
            }
        }



        public string GetThanhPho(int? id)
        {
            string html = "";

            List<ThanhPhoModel> lst = new List<ThanhPhoModel>();
            lst = (from grpo in db.tbTinhThanhPhoes
                   where grpo.Hide != true
                   select (new ThanhPhoModel
                   {
                       Id = grpo.IDTP,
                       Name = grpo.TenTP
                   })).ToList();
            int tong = lst.Count;

            if (id != null)
            {
                html = "<option value= ''> ----- Chọn -----</option>";
                for (int i = 0; i < tong; i++)
                {
                    if (id == lst[i].Id)
                    {
                        html += "<option selected value='" + lst[i].Id + "'>" + lst[i].Name + "</option>";
                    }
                    else
                    {
                        html += "<option value='" + lst[i].Id + "'>" + lst[i].Name + "</option>";

                    }
                }
            }
            else
            {
                html = "<option selected value= ''> ----- Chọn -----</option>";
                for (int i = 0; i < tong; i++)
                {
                    html += "<option value='" + lst[i].Id + "'>" + lst[i].Name + "</option>";
                }
            }
            return html;

        }
        public String GetThanhPhoName(int id)

        {
            try
            {
                return db.tbTinhThanhPhoes.Find(id).TenTP;
            }
            catch
            {
                return "";
            }
        }




        public string GetDanhSachQuan(int? idThanhPho, int? idQuan)
        {
            string html = "<option value=''>----- Chọn Quận/Huyện -----</option>";

            if (idThanhPho == null)
            {
                return html;
            }

            List<QuanHuyenModel> lstQuan = (from qh in db.tbQuanHuyens
                                            where qh.Hide != true && qh.IDTP == idThanhPho
                                            select new QuanHuyenModel
                                            {
                                                IDQuan = qh.IDQuan,
                                                TenQuan = qh.TenQuan
                                            }).ToList();

            foreach (var qh in lstQuan)
            {
                if (idQuan == qh.IDQuan)
                {
                    html += $"<option selected value='{qh.IDQuan}'>{qh.TenQuan}</option>";
                }
                else
                {
                    html += $"<option value='{qh.IDQuan}'>{qh.TenQuan}</option>";
                }
            }

            return html;
        }
        public String GetQuanHuyenName(int id)

        {
            try
            {
                return db.tbQuanHuyens.Find(id).TenQuan;
            }
            catch
            {
                return "";
            }
        }


        public string GetDanhSachPhuong(int? idPhuong, int? idQuan)
        {
            string html = "<option value=''>----- Chọn Phường/Xã -----</option>";

            if (idQuan == null)
            {
                return html;
            }

            List<PhuongXaModel> lstPhuong = (from qh in db.tbXaPhuongs
                                            where qh.Hide != true && qh.IDQuan == idQuan
                                            select new PhuongXaModel
                                            {
                                                IDPhuong = qh.IDPhuong,
                                                TenPhuong = qh.TenPhuong
                                            }).ToList();

            foreach (var qh in lstPhuong)
            {
                if (idPhuong == qh.IDPhuong)
                {
                    html += $"<option selected value='{qh.IDPhuong}'>{qh.TenPhuong}</option>";
                }
                else
                {
                    html += $"<option value='{qh.IDPhuong}'>{qh.TenPhuong}</option>";
                }
            }

            return html;
        }
        public String GetPhuongXaName(int id)

        {
            try
            {
                return db.tbXaPhuongs.Find(id).TenPhuong;
            }
            catch
            {
                return "";
            }
        }







        public string GetNhomMau(int? id)
        {
            string html = "";

            List<NhomMauModel> lst = new List<NhomMauModel>();
            lst = (from grpo in db.tbNhomMaus
                   where grpo.Hide != true
                   select (new NhomMauModel
                   {
                       Id = grpo.IDNhomMau,
                       Name = grpo.TenNhomMau

                   })).ToList();
            int tong = lst.Count;

            if (id != null)
            {
                html = "<option value= ''> ----- Chọn -----</option>";
                for (int i = 0; i < tong; i++)
                {
                    if (id == lst[i].Id)
                    {
                        html += "<option selected value='" + lst[i].Id + "'>" + lst[i].Name + "</option>";
                    }
                    else
                    {
                        html += "<option value='" + lst[i].Id + "'>" + lst[i].Name + "</option>";

                    }
                }
            }
            else
            {
                html = "<option selected value= ''> ----- Chọn -----</option>";
                for (int i = 0; i < tong; i++)
                {
                    html += "<option value='" + lst[i].Id + "'>" + lst[i].Name + "</option>";
                }
            }
            return html;

        }
        public String GetNhomMauName(int id)

        {
            try
            {
                return db.tbNhomMaus.Find(id).TenNhomMau;
            }
            catch
            {
                return "";
            }
        }


        public ActionResult Home()
        {
            string Gmail = Session["UserEmail"] as string;
            if (string.IsNullOrEmpty(Gmail))
            {
                return RedirectToAction("Index", "Home");  // Trường hợp email không được truyền vào
            }
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
            if (user == null)
            {
                return Redirect("/not-found"); // Trường hợp không tìm thấy người dùng
            }
            user.DanhSachThanhPho = db.tbTinhThanhPhoes.ToList();
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

            //if (!string.IsNullOrEmpty(user.CCCD))
            //{
            //    user.CCCD = new string('*', user.CCCD.Length);
            //}
            //else
            //{
            //    user.CCCD = "(Chưa có thông tin)";
            //}
            if (string.IsNullOrEmpty(user.CCCD))
            {
                user.CCCD = "(Chưa có thông tin)";
            }
            if (string.IsNullOrEmpty(user.SDT))
            {
                user.SDT = "(Chưa có thông tin)";
            }
            if (string.IsNullOrEmpty(user.HinhAnh))
            {
                user.HinhAnh = "/Content/img/avatarfb.jpg";
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
            Session["MaTaiKhoan"] = user.MaTaiKhoan;
            Session["HinhAnh"] = user.HinhAnh;
            return View(user);
        }



        public ActionResult Index()
        {
            string Gmail = Session["UserEmail"] as string;
            if (string.IsNullOrEmpty(Gmail))
            {
                return RedirectToAction("Index", "Home");  // Trường hợp email không được truyền vào
            }
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
            if (user == null)
            {
                return Redirect("/not-found"); // Trường hợp không tìm thấy người dùng
            }
            user.DanhSachThanhPho = db.tbTinhThanhPhoes.ToList();
            if (string.IsNullOrEmpty(user.HoTen))
            {
                user.HoTen = "(Chưa có thông tin)";
            }
            if (user.GioiTinh == null)
            {
                user.GioiTinhDisplay = "(Chưa có thông tin)"; 
            }
            else if (user.GioiTinh == true)
            {
                user.GioiTinhDisplay = "Nam"; 
            }
            else
            {
                user.GioiTinhDisplay = "Nữ"; 
            }
            if (user.NgaySinh == null)
            {
                user.NgaySinhDisplay = "--/--/----"; 
            }
            else
            {
                user.NgaySinhDisplay = user.NgaySinh.Value.ToString("dd/MM/yyyy"); 
            }
            if (string.IsNullOrEmpty(user.DiaChi))
            {
                user.DiaChi = "(Chưa có thông tin)"; 
            }
            if (!user.IDPhuong.HasValue || user.IDPhuong.Value == 0)
            {
                user.IDPhuong = null; 
            }
            if (!user.IDQuan.HasValue || user.IDQuan.Value == 0)
            {
                user.IDQuan = null; 
            }
            if (!user.IDThanhPho.HasValue || user.IDThanhPho.Value == 0)
            {
                user.IDThanhPho = null; 
            }
            if (!user.NgheNghiep.HasValue || user.NgheNghiep.Value == 0)
            {
                user.NgheNghiep = null;
            }
            if (user.TinhTrangHonNhan == null)
            {
                user.TinhTrangHonNhanDisplay = "(Chưa có thông tin)"; 
            }
            else if (user.TinhTrangHonNhan == true)
            {
                user.TinhTrangHonNhanDisplay = "Độc Thân"; 
            }
            else
            {
                user.TinhTrangHonNhanDisplay = "Đã Kết Hôn"; 
            }

            //if (!string.IsNullOrEmpty(user.CCCD))
            //{
            //    user.CCCD = new string('*', user.CCCD.Length);
            //}
            //else
            //{
            //    user.CCCD = "(Chưa có thông tin)";
            //}
            if (string.IsNullOrEmpty(user.CCCD))
            {
                user.CCCD = "(Chưa có thông tin)";
            }
            if (string.IsNullOrEmpty(user.SDT))
            {
                user.SDT = "(Chưa có thông tin)";
            }
            if (string.IsNullOrEmpty(user.HinhAnh))
            {
                user.HinhAnh = "/Content/img/avatarfb.jpg";
            }
            if (user.NgayCap == null)
            {
                user.NgayCapDisplay = "--/--/----"; 
            }
            else
            {
                user.NgayCapDisplay = user.NgayCap.Value.ToString("dd/MM/yyyy"); 
            }
            if (!user.NoiCap_IDTP.HasValue || user.NoiCap_IDTP.Value == 0)
            {
                user.NoiCap_IDTP = null; 
            }
            if (!user.IDNhomMau.HasValue || user.IDNhomMau.Value == 0)
            {
                user.IDNhomMau = null;
            }
            Session["MaTaiKhoan"] = user.MaTaiKhoan;
            Session["HinhAnh"] = user.HinhAnh;
            return View(user);
        }

        [HttpPost]
        public ActionResult Index(ThongTinCaNhanModels model, HttpPostedFileBase Editfile)
        {
            if (ModelState.IsValid)
            {
                string Gmail = Session["UserEmail"] as string;
                if (string.IsNullOrEmpty(Gmail))
                {
                    return RedirectToAction("Index", "Home");  
                }

                var user = db.tbThongTinCaNhans.FirstOrDefault(u => u.Gmail == Gmail);
                if (user != null)
                {
                    if (Editfile != null )
                    {
                        user.HinhAnh = UploadImage(Editfile);
                    }
                    user.HoTen = model.HoTen;
                    user.GioiTinh = model.GioiTinh;
                    user.NgaySinh = model.NgaySinh;
                    user.DiaChi = model.DiaChi;
                    user.IDThanhPho = model.IDThanhPho;
                    user.IDQuan = model.IDQuan;
                    user.IDPhuong = model.IDPhuong;
                    user.NgheNghiep = model.NgheNghiep;
                    user.TinhTrangHonNhan = model.TinhTrangHonNhan;
                    user.CCCD = model.CCCD;
                    user.NgayCap = model.NgayCap;
                    user.NoiCap_IDTP = model.NoiCap_IDTP;
                    user.IDNhomMau = model.IDNhomMau;
                    user.SDT = model.SDT;
                    db.Entry(user).State = EntityState.Modified;

                    db.SaveChanges();

                    Session["UserEmail"] = model.Gmail;

                    return RedirectToAction("Index", "HomePage");
                }
                else
                {
                    ModelState.AddModelError("", "Không tìm thấy thông tin người dùng.");
                }
            }

            return View(model);
        }
        [HttpPost]
        public JsonResult GetJson(int id)
        {
            List<tbQuanHuyen> user = new List<tbQuanHuyen> { };
            try
            {
                user = db.tbQuanHuyens.Where(s => s.IDTP == id).OrderByDescending(a => a.TenQuan).ToList();

            }
            catch
            {
                user = new List<tbQuanHuyen> { };
            }
            return Json(user, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult GetJsonXaPhuong(int idQuan)
        {
            List<tbXaPhuong> XP = new List<tbXaPhuong> { };
            try
            {
                XP = db.tbXaPhuongs.Where(s => s.IDQuan == idQuan).OrderByDescending(a => a.TenPhuong).ToList();
            }
            catch
            {
                XP = new List<tbXaPhuong> { };
            }
            return Json(XP, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult GetQuanHuyen(int idThanhPho)
        {
            List<QuanHuyenModel> lstQuanHuyen = db.tbQuanHuyens
                .Where(qh => qh.IDTP == idThanhPho)  
                .Select(qh => new QuanHuyenModel
                {
                    IDQuan = qh.IDQuan,
                    TenQuan = qh.TenQuan
                })
                .ToList();

            return Json(lstQuanHuyen, JsonRequestBehavior.AllowGet);
        }
























        public ActionResult Login()
        {
            string Gmail = Session["UserEmail"] as string;
            if (string.IsNullOrEmpty(Gmail))
            {
                return RedirectToAction("Index", "Home");  // Trường hợp email không được truyền vào
            }
            var user = db.tbThongTinCaNhans
                             .Where(u => u.Gmail == Gmail)
                             .Select(ab => new ThongTinCaNhanModels
                             {
                                 MaTaiKhoan = ab.MaTaiKhoan,
                                 Gmail = ab.Gmail,
                                 SDT = ab.SDT,
                                 MatKhau = ab.MatKhau,
                             })
                             .FirstOrDefault();
            if (user == null)
            {
                return Redirect("/not-found"); // Trường hợp không tìm thấy người dùng
            }        
            Session["MaTaiKhoan"] = user.MaTaiKhoan;
            Session["MatKhau"] = user.MatKhau;
            return View(user);
        }
        [HttpPost]
        public JsonResult Login(ThongTinCaNhanModels model, string OldMatKhau, string NewMatKhau, string ConfirmNewMatKhau)
        {
            if (ModelState.IsValid)
            {
                string Gmail = Session["UserEmail"] as string;
                if (string.IsNullOrEmpty(Gmail))
                {
                    return Json(new { success = false, message = "Email không hợp lệ." });
                }

                var user = db.tbThongTinCaNhans.FirstOrDefault(u => u.Gmail == Gmail);
                if (user != null)
                {
                    user.Gmail = model.Gmail;
                    user.SDT = model.SDT;

                    if (user.MatKhau != OldMatKhau)
                    {
                        return Json(new { success = false, message = "Mật khẩu cũ không chính xác." });
                    }
                    if (NewMatKhau != ConfirmNewMatKhau)
                    {
                        return Json(new { success = false, message = "Mật khẩu mới và mật khẩu xác nhận không khớp." });
                    }
                    if (!string.IsNullOrEmpty(NewMatKhau))
                    {
                        user.MatKhau = NewMatKhau;
                    }

                    db.Entry(user).State = EntityState.Modified;
                    db.SaveChanges();
                    Session["UserEmail"] = model.Gmail;


                    return Json(new { success = true, message = "Cập nhật thành công." });
                }
                else
                {
                    return Json(new { success = false, message = "Không tìm thấy thông tin người dùng." });
                }
            }
            return Json(new { success = false, message = "Dữ liệu không hợp lệ." });
        }

        //[HttpPost]
        //public ActionResult Login(ThongTinCaNhanModels model, string OldMatKhau, string NewMatKhau, string ConfirmNewMatKhau)
        //{
        //    if (ModelState.IsValid)
        //    {
        //        string Gmail = Session["UserEmail"] as string;
        //        // Tìm người dùng trong cơ sở dữ liệu bằng MaTaiKhoan (hoặc Gmail)
        //        if (string.IsNullOrEmpty(Gmail))
        //        {
        //            return RedirectToAction("Index", "Home");  // Nếu không có Gmail trong session, chuyển hướng đến trang đăng nhập
        //        }

        //        // Tìm người dùng dựa trên Gmail
        //        var user = db.tbThongTinCaNhans.FirstOrDefault(u => u.Gmail == Gmail);
        //        if (user != null)
        //        {
        //            // Cập nhật thông tin người dùng
        //            user.Gmail = model.Gmail;
        //            user.SDT = model.SDT;
        //            if (user.MatKhau != OldMatKhau)
        //            {
        //                ModelState.AddModelError("", "Mật khẩu cũ không chính xác.");
        //                return View(model);
        //            }

        //            // Kiểm tra mật khẩu mới và xác nhận mật khẩu
        //            if (NewMatKhau != ConfirmNewMatKhau)
        //            {
        //                ModelState.AddModelError("", "Mật khẩu mới và mật khẩu xác nhận không khớp.");
        //                return View(model);
        //            }
        //            if (!string.IsNullOrEmpty(NewMatKhau))  // Cập nhật mật khẩu mới nếu có
        //            {
        //                user.MatKhau = NewMatKhau;
        //            }
        //            db.Entry(user).State = EntityState.Modified;

        //            // Lưu thay đổi vào cơ sở dữ liệu
        //            db.SaveChanges();

        //            // Cập nhật thông tin mới vào session (nếu cần)
        //            Session["UserEmail"] = model.Gmail;

        //            // Sau khi cập nhật thành công, trả về trang profile
        //            return RedirectToAction("Index", "HomePage");
        //        }
        //        else
        //        {
        //            ModelState.AddModelError("", "Không tìm thấy thông tin người dùng.");
        //        }
        //    }

        //    // Nếu có lỗi, quay lại trang chỉnh sửa với thông tin đã nhập
        //    return View(model);
        //}


        public ActionResult UpdateUserProfile()
        {
            string Gmail = Session["UserEmail"] as string;
            if (string.IsNullOrEmpty(Gmail))
            {
                return RedirectToAction("Index", "Home");  // Trường hợp email không được truyền vào
            }
            var user = db.tbThongTinCaNhans
                             .Where(u => u.Gmail == Gmail)
                             .Select(ab => new ThongTinCaNhanModels
                             {
                                 MaTaiKhoan = ab.MaTaiKhoan,
                                 Gmail = ab.Gmail,
                                 SDT = ab.SDT,
                                 MatKhau = ab.MatKhau,
                             })
                             .FirstOrDefault();
            if (user == null)
            {
                return Redirect("/not-found"); // Trường hợp không tìm thấy người dùng
            }
            Session["MaTaiKhoan"] = user.MaTaiKhoan;
            Session["MatKhau"] = user.MatKhau;
            return View(user);
        }

        [HttpPost]
        public ActionResult UpdateUserProfile(ThongTinCaNhanModels model, string OldMatKhau, string NewMatKhau, string ConfirmNewMatKhau)
        {
            try
            {
                // Kiểm tra tính hợp lệ của dữ liệu
                if (!ModelState.IsValid)
                {
                    TempData["Message"] = "Dữ liệu không hợp lệ, vui lòng kiểm tra lại!";
                    TempData["IsSuccess"] = false;
                    return View(model); // Không chuyển trang
                }

                string Gmail = Session["UserEmail"] as string;
                if (string.IsNullOrEmpty(Gmail))
                {
                    TempData["Message"] = "Bạn chưa đăng nhập, vui lòng đăng nhập để tiếp tục.";
                    TempData["IsSuccess"] = false;
                    return RedirectToAction("Index", "Home"); // Chuyển hướng về trang chủ nếu không đăng nhập
                }

                var user = db.tbThongTinCaNhans.FirstOrDefault(u => u.Gmail == Gmail);
                if (user == null)
                {
                    TempData["Message"] = "Không tìm thấy thông tin tài khoản.";
                    TempData["IsSuccess"] = false;
                    return View(model); // Không chuyển trang
                }

                // Kiểm tra mật khẩu cũ
                if (!string.IsNullOrEmpty(OldMatKhau) && user.MatKhau != OldMatKhau)
                {
                    TempData["Message"] = "Mật khẩu cũ không chính xác.";
                    TempData["IsSuccess"] = false;
                    return View(model); // Không chuyển trang
                }

                // Kiểm tra mật khẩu mới và xác nhận mật khẩu
                if (!string.IsNullOrEmpty(NewMatKhau) && NewMatKhau != ConfirmNewMatKhau)
                {
                    TempData["Message"] = "Mật khẩu mới và mật khẩu xác nhận " + Environment.NewLine + "không khớp.";
                    TempData["IsSuccess"] = false;
                    return View(model); // Không chuyển trang
                }

                // Cập nhật thông tin nếu không có lỗi
                user.Gmail = model.Gmail;
                user.SDT = model.SDT;
                if (!string.IsNullOrEmpty(NewMatKhau))
                {
                    user.MatKhau = NewMatKhau;
                }

                db.Entry(user).State = EntityState.Modified;
                db.SaveChanges();

                // Lưu thông tin vào Session
                Session["UserEmail"] = model.Gmail;

                TempData["Message"] = "Cập nhật thông tin thành công!";
                TempData["IsSuccess"] = true;

                return RedirectToAction("UpdateUserProfile"); // Load lại trang khi thành công
            }
            catch (Exception ex)
            {
                TempData["Message"] = $"Đã xảy ra lỗi: {ex.Message}";
                TempData["IsSuccess"] = false;
                return View(model); // Không chuyển trang
            }
        }




        public ActionResult BloodInfor()
        {
            string Gmail = Session["UserEmail"] as string;
            if (string.IsNullOrEmpty(Gmail))
            {
                return RedirectToAction("Index", "Home"); 
            }
            var user = db.tbBloodInfors.Where(u => u.IDThTinMau == 6)
                             .Select(ab => new ThongTinMauModel
                             {
                                 TieuDe = ab.TieuDe,
                                 NoiDung = ab.NoiDung,
                                 HinhAnh = ab.HinhAnh
                             })
                             .FirstOrDefault();
            if (user == null)
            {
                return Redirect("/not-found");
            }
            return View(user);
        }

        public ActionResult ResBlood()
        {
            // Lấy Gmail từ Session
            string Gmail = Session["UserEmail"] as string;
            if (string.IsNullOrEmpty(Gmail))
            {
                return RedirectToAction("Index", "Home"); // Chuyển hướng nếu không có thông tin đăng nhập
            }

            // Lấy thông tin từ bảng tbThongTinCaNhan dựa trên Gmail
            var user = db.tbThongTinCaNhans.FirstOrDefault(u => u.Gmail == Gmail);
            if (user == null)
            {
                return Redirect("/not-found"); // Không tìm thấy người dùng
            }

            // Tạo model để gửi đến view
            var model = new LichSuGiaoDichModel
            {
                MaTaiKhoan = user.MaTaiKhoan,
                IDNhomMau = user.IDNhomMau,
                Gmail = user.Gmail,
                HoTen = user.HoTen,
                SDT = user.SDT,
                DiaChi = user.DiaChi,
                IDPhuong = user.IDPhuong,
                IDQuan = user.IDQuan,
                IDThanhPho = user.IDThanhPho // Chỉ dùng để hiển thị kiểm tra
            };

            return View(model);
        }

        [HttpPost]
        public ActionResult ResBlood(LichSuGiaoDichModel model)
        {
            try
            { 
                if (!ModelState.IsValid )
                {
                    TempData["Message"] = "Dữ liệu không hợp lệ, vui lòng kiểm tra lại!";
                    TempData["IsSuccess"] = false;
                    return View(model);
                }
                if (model.TinhTrangYeuCau == null)
                {
                    TempData["Message"] = "Vui lòng điền đủ thông tin trước khi gửi!";
                    TempData["IsSuccess"] = false;
                    return View(model);
                }

                string Gmail = Session["UserEmail"] as string;
                if (string.IsNullOrEmpty(Gmail))
                {
                    TempData["Message"] = "Bạn chưa đăng nhập, vui lòng đăng nhập để tiếp tục.";
                    TempData["IsSuccess"] = false;
                    return RedirectToAction("Index", "Home");
                }

                var user = db.tbThongTinCaNhans.FirstOrDefault(u => u.Gmail == Gmail);
                if (user == null)
                {
                    TempData["Message"] = "Không tìm thấy thông tin tài khoản.";
                    TempData["IsSuccess"] = false;
                    return View(model);
                }

                var giaoDich = new tbLichSuGiaoDich
                {
                    MaTaiKhoan = user.MaTaiKhoan,
                    IDNhomMau = user.IDNhomMau,
                    TinhTrangYeuCau = model.TinhTrangYeuCau,
                    NgayYeuCau = DateTime.Now,
                    Hide = false,
                    TrangThai = false
                };
                db.tbLichSuGiaoDiches.Add(giaoDich);
                db.SaveChanges();
                TempData["Message"] = "Gửi yêu cầu thành công!";
                TempData["IsSuccess"] = true;
                var thongKe = db.tbThongKeMaus
                                .FirstOrDefault(tk => tk.MaTaiKhoan == giaoDich.MaTaiKhoan);
                if (thongKe != null)
                {
                    if (giaoDich.TinhTrangYeuCau == true)
                        thongKe.SoLanHienMau += 1;
                    else
                        thongKe.SoLanNhanMau += 1;
                }
                else
                {
                    db.tbThongKeMaus.Add(new tbThongKeMau
                    {
                        MaTaiKhoan = giaoDich.MaTaiKhoan,
                        Hide = false,
                        SoLanHienMau = giaoDich.TinhTrangYeuCau == true ? 1 : 0,
                        SoLanNhanMau = giaoDich.TinhTrangYeuCau == false ? 1 : 0
                    });
                }
                db.SaveChanges ();
                return RedirectToAction("ResBlood");
            }
            catch (Exception ex)
            {
                TempData["Message"] = $"Đã xảy ra lỗi: {ex.Message}";
                TempData["IsSuccess"] = false;
                return View(model);
            }
        }



        public ActionResult History()
        {
            // Lấy Gmail từ Session
            string Gmail = Session["UserEmail"] as string;
            if (string.IsNullOrEmpty(Gmail))
            {
                return RedirectToAction("Index", "Home");
            }
            if (Session["MaTaiKhoan"] == null)
            {
                return Redirect("/not-found");
            }

            int MaTaiKhoan;
            if (!int.TryParse(Session["MaTaiKhoan"].ToString(), out MaTaiKhoan))
            {
                return Redirect("/not-found");
            }
            var model = db.tbLichSuGiaoDiches
                        .Where(x => x.MaTaiKhoan == MaTaiKhoan && x.Hide == false)
                        .Select(x => new LichSuGiaoDichModel
                        {
                            NgayYeuCau = x.NgayYeuCau,
                            TinhTrangYeuCau = x.TinhTrangYeuCau,
                            TrangThai = x.TrangThai,
                            NgayXacNhan = x.NgayXacNhan
                        }).ToList();

            return View(model);
        }



    }

}