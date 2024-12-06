using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ManageBloodTypes.Models
{
    public class RegisterModel
    {
        public int IDThongTin { get; set; }
        public string HoTen { get; set; }
        public string Gmail { get; set; }
        public string MatKhau { get; set; }
        public Nullable<bool> Hide { get; set; }
        public int? MaTaiKhoan { get; internal set; }
    }
}