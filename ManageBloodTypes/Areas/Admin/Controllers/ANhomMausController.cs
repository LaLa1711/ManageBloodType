using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using ManageBloodTypes.DBContext;

namespace ManageBloodTypes.Areas.Admin.Controllers
{
    public class ANhomMausController : Controller
    {
        private QLMauEntities db = new QLMauEntities();

        // GET: Admin/ANhomMaus
        public ActionResult Index()
        {
            return View(db.tbNhomMaus.ToList());
        }

        // GET: Admin/ANhomMaus/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            tbNhomMau tbNhomMau = db.tbNhomMaus.Find(id);
            if (tbNhomMau == null)
            {
                return HttpNotFound();
            }
            return View(tbNhomMau);
        }

        // GET: Admin/ANhomMaus/Create
        public ActionResult Create()
        {
            tbNhomMau item = new tbNhomMau();
            return View(item);
        }

        [HttpPost]
        [ValidateInput(false)]
        public ActionResult Create(tbNhomMau tbNhom)
        {
            tbNhomMau item = new tbNhomMau();
            try
            {
                item.TenNhomMau = tbNhom.TenNhomMau;
                item.Hide = false;
                db.tbNhomMaus.Add(item);
                db.SaveChanges();
                return Redirect("/Admin/ANhomMaus");
            }
            catch
            {
                return View(tbNhom);
            }
        }

        // GET: Admin/ANhomMaus/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            tbNhomMau tbNhomMau = db.tbNhomMaus.Find(id);
            if (tbNhomMau == null)
            {
                return HttpNotFound();
            }
            return View(tbNhomMau);
        }

        [HttpPost]
        [ValidateInput(false)]
        public ActionResult Edit( tbNhomMau tbNhom)
        {
            try
            {
                tbNhomMau item = new tbNhomMau();

                item = db.tbNhomMaus.Find(tbNhom.IDNhomMau);
                item.TenNhomMau = tbNhom.TenNhomMau;
                item.Hide = tbNhom.Hide;
                db.Entry(item).State = EntityState.Modified;
                db.SaveChanges();
                return Redirect("/Admin/ANhomMaus");
            }
            catch (Exception ex)
            {
                return View(tbNhom);
            }
        }

        // GET: Admin/ANhomMaus/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            tbNhomMau tbNhomMau = db.tbNhomMaus.Find(id);
            if (tbNhomMau == null)
            {
                return HttpNotFound();
            }
            return View(tbNhomMau);
        }

        // POST: Admin/ANhomMaus/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            tbNhomMau tbNhomMau = db.tbNhomMaus.Find(id);
            db.tbNhomMaus.Remove(tbNhomMau);
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
