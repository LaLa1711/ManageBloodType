﻿using ManageBloodTypes.App_Start;
using ManageBloodTypes.DBContext;
using ManageBloodTypes.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ManageBloodTypes.Controllers
{
    public class DoctorController : Controller
    {
        QLMauEntities db = new QLMauEntities();
        #region -- Xử Lý File Upload
        #region -- Upload
        private string pathFile = "/files/doctor/" + DateTime.Now.Year + "/" + DateTime.Now.Month + "/";
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
        public string GetThanhPhoInfo(int? id)
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
        public string GetDanhSachQuanInfo(int? idThanhPho, int? idQuan)
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
        public string GetDanhSachPhuongInfo(int? idPhuong, int? idQuan)
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
        // GET: Doctor
        public ActionResult Index()
        {
            string Gmail = Session["UserEmail"] as string;
            if (string.IsNullOrEmpty(Gmail))
            {
                return RedirectToAction("Index", "Home");
            }

            var user = db.tbLichSuGiaoDiches.Where(u => u.IDGiaoDich == 1)
                             .Select(ab => new LichSuGiaoDichModel
                             {
                                 MaTaiKhoan = ab.MaTaiKhoan,
                                 IDNhomMau = ab.IDNhomMau,
                                 TinhTrangYeuCau = ab.TinhTrangYeuCau,
                                 TrangThai = ab.TrangThai,
                                 NgayXacNhan = ab.NgayXacNhan,
                                 NgayYeuCau = ab.NgayYeuCau,
                                 SoLuongMau = ab.SoLuongMau
                             })
                             .FirstOrDefault();
            if (user == null)
            {
                return Redirect("/not-found");
            }

            return View(user);
        }

        public ActionResult Search()
        {
            string Gmail = Session["UserEmail"] as string;

            if (string.IsNullOrEmpty(Gmail))
            {
                return RedirectToAction("Index", "Doctor");
            }

            ViewBag.ThanhPhoList = GetThanhPho(null);
            ViewBag.QuanList = GetDanhSachQuan(null, null);
            ViewBag.PhuongList = GetDanhSachPhuong(null, null);

            var bloodGroups = db.tbNhomMaus.Where(b => b.Hide == false).ToList();

            ViewBag.BloodGroups = bloodGroups;


            return View(new ThongTinCaNhanModels());
        }

        public string GetThanhPho(int? id)
        {
            string html = "<option value=''>----- Chọn Thành Phố -----</option>";
            var lst = db.tbTinhThanhPhoes
                        .Where(tp => tp.Hide != true)
                        .Select(tp => new { tp.IDTP, tp.TenTP })
                        .ToList();

            foreach (var item in lst)
            {
                html += $"<option value='{item.IDTP}'>{item.TenTP}</option>";
            }

            return html;
        }

        public string GetDanhSachQuan(int? idThanhPho, int? idQuan)
        {
            string html = "<option value=''>----- Chọn Quận/Huyện -----</option>";
            if (!idThanhPho.HasValue) return html;

            var lst = db.tbQuanHuyens
                        .Where(qh => qh.Hide != true && qh.IDTP == idThanhPho)
                        .Select(qh => new { qh.IDQuan, qh.TenQuan })
                        .ToList();

            foreach (var item in lst)
            {
                html += $"<option value='{item.IDQuan}'>{item.TenQuan}</option>";
            }

            return html;
        }

        public string GetDanhSachPhuong(int? idQuan, int? idPhuong)
        {
            string html = "<option value=''>----- Chọn Phường/Xã -----</option>";
            if (!idQuan.HasValue) return html;

            var lst = db.tbXaPhuongs
                        .Where(px => px.Hide != true && px.IDQuan == idQuan)
                        .Select(px => new { px.IDPhuong, px.TenPhuong })
                        .ToList();

            foreach (var item in lst)
            {
                html += $"<option value='{item.IDPhuong}'>{item.TenPhuong}</option>";
            }

            return html;
        }

        public ActionResult LoadQuanHuyen(int? idThanhPho)
        {
            if (!idThanhPho.HasValue)
            {
                return Json(new List<object>(), JsonRequestBehavior.AllowGet);
            }

            var lst = db.tbQuanHuyens
                        .Where(qh => qh.Hide != true && qh.IDTP == idThanhPho.Value)
                        .Select(qh => new
                        {
                            qh.IDQuan,
                            qh.TenQuan
                        })
                        .ToList();

            return Json(lst, JsonRequestBehavior.AllowGet);
        }

        public ActionResult LoadXaPhuong(int? idQuan)
        {
            if (!idQuan.HasValue)
            {
                return Json(new List<object>(), JsonRequestBehavior.AllowGet);
            }

            var lst = db.tbXaPhuongs
                        .Where(px => px.Hide != true && px.IDQuan == idQuan.Value)
                        .Select(px => new
                        {
                            px.IDPhuong,
                            px.TenPhuong
                        })
                        .ToList();

            if (!lst.Any()) 
            {
                Console.WriteLine("Không có phường/xã nào.");
            }

            return Json(lst, JsonRequestBehavior.AllowGet);
        }
        public ActionResult UpdateUserProfile()
        {
            string Gmail = Session["UserEmail"] as string;
            if (string.IsNullOrEmpty(Gmail))
            {
                return RedirectToAction("Index", "Doctor"); 
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
                return Redirect("/not-found"); 
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
                if (!ModelState.IsValid)
                {
                    TempData["Message"] = "Dữ liệu không hợp lệ, vui lòng kiểm tra lại!";
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

                if (!string.IsNullOrEmpty(OldMatKhau) && user.MatKhau != OldMatKhau)
                {
                    TempData["Message"] = "Mật khẩu cũ không chính xác.";
                    TempData["IsSuccess"] = false;
                    return View(model); 
                }

                if (!string.IsNullOrEmpty(NewMatKhau) && NewMatKhau != ConfirmNewMatKhau)
                {
                    TempData["Message"] = "Mật khẩu mới và mật khẩu xác nhận " + Environment.NewLine + "không khớp.";
                    TempData["IsSuccess"] = false;
                    return View(model); 
                }

                user.Gmail = model.Gmail;
                user.SDT = model.SDT;
                if (!string.IsNullOrEmpty(NewMatKhau))
                {
                    user.MatKhau = NewMatKhau;
                }

                db.Entry(user).State = EntityState.Modified;
                db.SaveChanges();

                Session["UserEmail"] = model.Gmail;

                TempData["Message"] = "Cập nhật thông tin thành công!";
                TempData["IsSuccess"] = true;

                return RedirectToAction("UpdateUserProfile"); 
            }
            catch (Exception ex)
            {
                TempData["Message"] = $"Đã xảy ra lỗi: {ex.Message}";
                TempData["IsSuccess"] = false;
                return View(model); 
            }
        }
        public ActionResult Information()
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
                return Redirect("/not-found"); 
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
        public ActionResult Information(ThongTinCaNhanModels model, HttpPostedFileBase Editfile)
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
                    if (Editfile != null)
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


                    return RedirectToAction("Index", "Doctor");
                }
                else
                {
                    ModelState.AddModelError("", "Không tìm thấy thông tin người dùng.");
                }
            }

            return View(model);
        }
    }
}
