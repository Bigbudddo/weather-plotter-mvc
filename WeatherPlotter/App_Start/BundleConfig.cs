using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Optimization;

namespace WeatherPlotter {

	public class BundleConfig {

        public static void RegisterBundles(BundleCollection bundles) {
            // setup some variables
            const string STYLES_ROOT = "~/Content/";
            const string SCRIPTS_ROOT = "~/Scripts/";
            const string ANGULAR_APP_ROOT = "~/App/";

            // register the core styles bundle
            var coreStyles = new Bundle(STYLES_ROOT + "core")
                .Include(STYLES_ROOT + "angular-ui-notification.css")
                .Include(STYLES_ROOT + "bulma.css");

            // register the core scripts bundle
            var coreScripts = new Bundle(SCRIPTS_ROOT + "core")
                .Include(SCRIPTS_ROOT + "jquery.js")
                .Include(SCRIPTS_ROOT + "moment.js")
                .Include(SCRIPTS_ROOT + "highcharts.js")
                .Include(SCRIPTS_ROOT + "highcharts-more.js")
                .Include(SCRIPTS_ROOT + "map.js") // highmaps
                .Include(SCRIPTS_ROOT + "angular.js")
                .Include(SCRIPTS_ROOT + "ui-router.js")
                .Include(SCRIPTS_ROOT + "angular-animate.js")
                .Include(SCRIPTS_ROOT + "angular-aria.js")
                .Include(SCRIPTS_ROOT + "angular-sanatize.js")
                .Include(SCRIPTS_ROOT + "angular-messages.js")
                .Include(SCRIPTS_ROOT + "angular-cookies.js")
                .Include(SCRIPTS_ROOT + "angular-filter.js")
                .Include(SCRIPTS_ROOT + "angular-ui-notification.js")
                .Include(SCRIPTS_ROOT + "master.js");

            // render our custom stylesheets
            var stylesheets = new StyleBundle(STYLES_ROOT + "main")
                .Include(STYLES_ROOT + "styles.css");

            // render our custom scripts
            var scripts = new ScriptBundle(ANGULAR_APP_ROOT + "main")
                .Include(ANGULAR_APP_ROOT + "app.js")
                .Include(ANGULAR_APP_ROOT + "route.js")
                .IncludeDirectory(ANGULAR_APP_ROOT, "*.js", searchSubdirectories: true);

            bundles.Add(coreStyles);
            bundles.Add(stylesheets);
            bundles.Add(coreScripts);
            bundles.Add(scripts);

            BundleTable.EnableOptimizations = false;
        }
    }
}