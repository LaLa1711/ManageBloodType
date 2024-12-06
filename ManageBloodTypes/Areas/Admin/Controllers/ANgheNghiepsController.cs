using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using System.Web.UI.WebControls;
using ManageBloodTypes.DBContext;

namespace ManageBloodTypes.Areas.Admin.Controllers
{
    public class ANgheNghiepsController : Controller
    {
        private QLMauEntities db = new QLMauEntities();

        // GET: Admin/ANgheNghieps
        public ActionResult Index()
        {
            return View(db.tbNgheNghieps.ToList());
        }

        // GET: Admin/ANgheNghieps/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            tbNgheNghiep tbNgheNghiep = db.tbNgheNghieps.Find(id);
            if (tbNgheNghiep == null)
            {
                return HttpNotFound();
            }
            return View(tbNgheNghiep);
        }

        // GET: Admin/ANgheNghieps/Create
        public ActionResult Create()
        {
            tbNgheNghiep item = new tbNgheNghiep();
            return View(item);
        }

        [HttpPost]
        [ValidateInput(false)]
        public ActionResult Create(tbNgheNghiep tbNghe)
        {
            tbNgheNghiep item = new tbNgheNghiep();
            try
            {
                item.TenNgheNghiep = tbNghe.TenNgheNghiep;
                item.Hide = false;
                db.tbNgheNghieps.Add(item);
                db.SaveChanges();
                return Redirect("/Admin/ANgheNghieps");
            }
            catch
            {
                return View(tbNghe);
            }
        }

        // GET: Admin/ANgheNghieps/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            tbNgheNghiep tbNgheNghiep = db.tbNgheNghieps.Find(id);
            if (tbNgheNghiep == null)
            {
                return HttpNotFound();
            }
            return View(tbNgheNghiep);
        }

        [HttpPost]
        [ValidateInput(false)]
        public ActionResult Edit(tbNgheNghiep tbNghe)
        {
            try
            {
                tbNgheNghiep item = new tbNgheNghiep();

                item = db.tbNgheNghieps.Find(tbNghe.IDNgheNghiep);
                item.TenNgheNghiep = tbNghe.TenNgheNghiep;
                item.Hide = tbNghe.Hide;
                db.Entry(item).State = EntityState.Modified;
                db.SaveChanges();
                return Redirect("/Admin/ANgheNghieps");
            }
            catch (Exception ex)
            {
                return View(tbNghe);
            }
        }

        // GET: Admin/ANgheNghieps/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            tbNgheNghiep tbNgheNghiep = db.tbNgheNghieps.Find(id);
            if (tbNgheNghiep == null)
            {
                return HttpNotFound();
            }
            return View(tbNgheNghiep);
        }

        // POST: Admin/ANgheNghieps/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            tbNgheNghiep tbNgheNghiep = db.tbNgheNghieps.Find(id);
            db.tbNgheNghieps.Remove(tbNgheNghiep);
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
