﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace ManageBloodTypes
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                name: "LandingPage",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "LandingPage", action = "Index", id = UrlParameter.Optional },
                namespaces: new[] { "ManageBloodTypes.Controllers" } // Chỉ định namespace rõ ràng
            );
            routes.MapRoute(
                name: "AdminHome",
                url: "Admin/{controller}/{action}/{id}",
                defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional },
                namespaces: new[] { "ManageBloodTypes.Areas.Admin.Controllers" } // Chỉ định namespace của khu vực Admin
            );


        }
    }
}
