using ManageBloodTypes.DBContext;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ManageBloodTypes.Models
{
    public class ThongTinCaNhanModels
    {
        public int IDThongTin { get; set; }
        public int? MaTaiKhoan {  get; set; }
        public string HoTen { get; set; }
        public string SDT { get; set; }
        public string Gmail { get; set; }
        public string MatKhau { get; set; }
        public string DiaChi { get; set; }
        public Nullable<int> IDPhuong { get; set; }
        public Nullable<int> IDQuan { get; set; }
        public Nullable<int> IDThanhPho { get; set; }
        public Nullable<System.DateTime> NgaySinh { get; set; }
        public string NgaySinhDisplay { get; set; }
        public Nullable<bool> GioiTinh { get; set; }
        public string GioiTinhDisplay { get; set; }
        public string CCCD { get; set; }
        public Nullable<System.DateTime> NgayCap { get; set; }
        public string NgayCapDisplay { get; set; }
        public Nullable<int> NoiCap_IDTP { get; set; }
        public string HinhAnh { get; set; }
        public Nullable<bool> TinhTrangHonNhan { get; set; }
        public string TinhTrangHonNhanDisplay {  get; set; }
        public Nullable<int> NgheNghiep { get; set; }
        public Nullable<int> IDNhomMau { get; set; }
        public Nullable<bool> Hide { get; set; }
        public List<tbTinhThanhPho> DanhSachThanhPho { get; set; }
    }
}