//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace ManageBloodTypes.DBContext
{
    using System;
    using System.Collections.Generic;
    
    public partial class tbThongTinCaNhan
    {
        public int IDThongTin { get; set; }
        public string HoTen { get; set; }
        public string SDT { get; set; }
        public string Gmail { get; set; }
        public string MatKhau { get; set; }
        public string DiaChi { get; set; }
        public Nullable<int> IDPhuong { get; set; }
        public Nullable<int> IDQuan { get; set; }
        public Nullable<int> IDThanhPho { get; set; }
        public Nullable<System.DateTime> NgaySinh { get; set; }
        public Nullable<bool> GioiTinh { get; set; }
        public string CCCD { get; set; }
        public Nullable<System.DateTime> NgayCap { get; set; }
        public Nullable<int> NoiCap_IDTP { get; set; }
        public string HinhAnh { get; set; }
        public Nullable<int> TinhTrangHonNhan { get; set; }
        public Nullable<int> NgheNghiep { get; set; }
        public Nullable<int> IDNhomMau { get; set; }
        public Nullable<bool> Hide { get; set; }
    }
}