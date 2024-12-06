using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.IO;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using CKFinder.Utils;
using ManageBloodTypes.App_Start;
using ManageBloodTypes.DBContext;

namespace ManageBloodTypes.Areas.Admin.Controllers
{
    public class ABloodInforsController : Controller
    {
        private QLMauEntities db = new QLMauEntities();
        #region -- Xử Lý File Upload
        #region -- Upload
        private string pathFile = "/files/bloodinfor/" + DateTime.Now.Year + "/" + DateTime.Now.Month + "/";
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
        // GET: Admin/ABloodInfors
        public ActionResult Index()
        {
            return View(db.tbBloodInfors.ToList());
        }

        // GET: Admin/ABloodInfors/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            tbBloodInfor tbBloodInfor = db.tbBloodInfors.Find(id);
            if (tbBloodInfor == null)
            {
                return HttpNotFound();
            }
            return View(tbBloodInfor);
        }

        // GET: Admin/ABloodInfors/Create
        public ActionResult Create()
        {
            tbBloodInfor item = new tbBloodInfor();
            return View(item);
        }

        [HttpPost]
        [ValidateInput(false)]
        public ActionResult Create(tbBloodInfor tbBlo, HttpPostedFileBase file)
        {
            tbBloodInfor item = new tbBloodInfor();
            try
            {
                if (file != null)
                {
                    item.HinhAnh = UploadImage(file);
                }
                else
                {
                    item.HinhAnh = tbBlo.HinhAnh;
                }

                item.TieuDe = tbBlo.TieuDe;
                item.NoiDung = tbBlo.NoiDung;
                item.Hide = false;
                db.tbBloodInfors.Add(item);
                db.SaveChanges();
                return Redirect("/admin/ABloodInfors");
            }
            catch
            {
                return View(tbBlo);
            }
        }

        // GET: Admin/ABloodInfors/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            tbBloodInfor tbBloodInfor = db.tbBloodInfors.Find(id);
            if (tbBloodInfor == null)
            {
                return HttpNotFound();
            }
            return View(tbBloodInfor);
        }

        [HttpPost]
        [ValidateInput(false)]
        public ActionResult Edit(tbBloodInfor tbBlo, HttpPostedFileBase Editfile)
        {
            try
            {
                tbBloodInfor item = new tbBloodInfor();

                item = db.tbBloodInfors.Find(tbBlo.IDThTinMau);
                if (Editfile != null)
                {
                    item.HinhAnh = UploadImage(Editfile);
                }
                item.TieuDe = tbBlo.TieuDe;
                item.NoiDung = tbBlo.NoiDung;
                item.Hide = tbBlo.Hide;
                db.Entry(item).State = EntityState.Modified;
                db.SaveChanges();
                return Redirect("/admin/ABloodInfors");
            }
            catch (Exception ex)
            {
                return View(tbBlo);
            }
        }

        // GET: Admin/ABloodInfors/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            tbBloodInfor tbBloodInfor = db.tbBloodInfors.Find(id);
            if (tbBloodInfor == null)
            {
                return HttpNotFound();
            }
            return View(tbBloodInfor);
        }

        // POST: Admin/ABloodInfors/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            tbBloodInfor tbBloodInfor = db.tbBloodInfors.Find(id);
            db.tbBloodInfors.Remove(tbBloodInfor);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
