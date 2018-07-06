var Encore = require('@symfony/webpack-encore');

Encore
    // the project directory where compiled assets will be stored
    .setOutputPath('public/build/')
    // the public path used by the web server to access the previous directory
    .setPublicPath('/build')
    .cleanupOutputBeforeBuild()
    .enableSourceMaps(!Encore.isProduction())
    // uncomment to create hashed filenames (e.g. app.abc123.css)
    //.enableVersioning(Encore.isProduction())

    // uncomment to define the assets of the project
    .addEntry('app', './assets/js/app.js')
    .addEntry('backend/app', './assets/backend/compile/backend.js')
    .addEntry('backend/js/jquery.min', './assets/backend/vendor/jquery/jquery.min.js')
    .addEntry('backend/js/jquery-ui.min', './assets/backend/vendor/jquery-ui-1.12.1/jquery-ui.min.js')
    .addEntry('backend/js/popper.min', './assets/backend/vendor/popper.min.js')
    .addEntry('backend/js/bootstrap.min', './assets/backend/vendor/bootstrap/js/bootstrap.min.js')
    .addEntry('backend/js/jquery.ui.touch-punch-improved', './assets/backend/vendor/jquery-ui-touch/jquery.ui.touch-punch-improved.js')
    .addEntry('backend/js/lobicard', './assets/backend/vendor/lobicard/js/lobicard.js')
    .addEntry('backend/js/jquery.dcjqaccordion.2.7', './assets/backend/vendor/jquery.dcjqaccordion.2.7.js')
    .addEntry('backend/js/jquery.scrollTo.min', './assets/backend/vendor/jquery.scrollTo.min.js')
    .addEntry('backend/js/scripts.min', './assets/backend/js/scripts.min.js')
    // .addStyleEntry('css/app', './assets/css/app.scss')

    // uncomment if you use Sass/SCSS files
    // .enableSassLoader()

    // uncomment for legacy applications that require $/jQuery as a global variable
    //.autoProvidejQuery()
;

module.exports = Encore.getWebpackConfig();
