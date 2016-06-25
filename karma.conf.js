// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html

module.exports = function(config) {
  config.set({
    // base path, that will be used to resolve files and exclude
    basePath: '',

    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: ['mocha', 'chai', 'sinon-chai', 'chai-as-promised', 'chai-things'],

    client: {
      mocha: {
        timeout: 5000 // set default mocha spec timeout
      }
    },

    // list of files / patterns to load in the browser
    files: [
      // bower:js
      'client/bower_components/jquery/dist/jquery.js',
      'client/bower_components/angular/angular.js',
      'client/bower_components/angular-cookies/angular-cookies.js',
      'client/bower_components/lodash/dist/lodash.compat.js',
      'client/bower_components/angular-socket-io/socket.js',
      'client/bower_components/PACE/pace.js',
      'client/bower_components/angular-animate/angular-animate.js',
      'client/bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
      'client/bower_components/bootstrap/dist/js/bootstrap.js',
      'client/bower_components/angular-bootstrap-nav-tree/dist/abn_tree_directive.js',
      'client/bower_components/echarts/build/dist/echarts.js',
      'client/bower_components/angular-echarts/dist/angular-echarts.min.js',
      'client/bower_components/angular-file-upload/angular-file-upload.min.js',
      'client/bower_components/angular-resource/angular-resource.js',
      'client/bower_components/angular-sanitize/angular-sanitize.js',
      'client/bower_components/angular-smart-table/dist/smart-table.js',
      'client/bower_components/angular-strap/dist/angular-strap.js',
      'client/bower_components/angular-strap/dist/angular-strap.tpl.js',
      'client/bower_components/summernote/dist/summernote.js',
      'client/bower_components/angular-summernote/dist/angular-summernote.js',
      'client/bower_components/angular-touch/angular-touch.js',
      'client/bower_components/moment/moment.js',
      'client/bower_components/fullcalendar/dist/fullcalendar.js',
      'client/bower_components/angular-ui-calendar/src/calendar.js',
      'client/bower_components/angular-ui-grid/ui-grid.js',
      'client/bower_components/angular-ui-utils/ui-utils.js',
      'client/bower_components/angular-ui-map/ui-map.js',
      'client/bower_components/angular-ui-router/release/angular-ui-router.js',
      'client/bower_components/angular-ui-select/dist/select.js',
      'client/bower_components/angular-xeditable/dist/js/xeditable.js',
      'client/bower_components/bower-jvectormap/jquery-jvectormap-1.2.2.min.js',
      'client/bower_components/datatables/media/js/jquery.dataTables.js',
      'client/bower_components/dropzone/dist/min/dropzone.min.js',
      'client/bower_components/moment-timezone/builds/moment-timezone-with-data-2010-2020.js',
      'client/bower_components/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min.js',
      'client/bower_components/flot/jquery.flot.js',
      'client/bower_components/flot-spline/js/jquery.flot.spline.js',
      'client/bower_components/flot.tooltip/js/jquery.flot.tooltip.js',
      'client/bower_components/footable/js/footable.js',
      'client/bower_components/handlebars/handlebars.js',
      'client/bower_components/html.sortable/dist/html.sortable.js',
      'client/bower_components/jQuery-Storage-API/jquery.storageapi.js',
      'client/bower_components/jquery-pjax/jquery.pjax.js',
      'client/bower_components/requirejs/require.js',
      'client/bower_components/jquery.easy-pie-chart/dist/jquery.easypiechart.js',
      'client/bower_components/ngImgCrop/compile/minified/ng-img-crop.js',
      'client/bower_components/ngstorage/ngStorage.js',
      'client/bower_components/oclazyload/dist/ocLazyLoad.js',
      'client/bower_components/parsleyjs/dist/parsley.js',
      'client/bower_components/screenfull/dist/screenfull.js',
      'client/bower_components/select2/dist/js/select2.js',
      'client/bower_components/tether/dist/js/tether.js',
      'client/bower_components/underscore/underscore.js',
      'client/bower_components/venturocket-angular-slider/build/angular-slider.js',
      'client/bower_components/waves/dist/waves.min.js',
      'client/bower_components/angular-mocks/angular-mocks.js',
      // endbower
      'node_modules/socket.io-client/socket.io.js',
      '.tmp/app/app.js',
      '.tmp/{app,components}/**/*.module.js',
      '.tmp/{app,components}/**/*.js',
      '.tmp/test/**/*.js',
      'client/{app,components}/**/*.html'
    ],

    preprocessors: {
      '**/*.html': 'ng-html2js',
    },

    ngHtml2JsPreprocessor: {
      stripPrefix: 'client/'
    },

    // list of files / patterns to exclude
    exclude: [],

    // web server port
    port: 8080,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,

    // reporter types:
    // - dots
    // - progress (default)
    // - spec (karma-spec-reporter)
    // - junit
    // - growl
    // - coverage
    reporters: ['spec'],

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['PhantomJS'],

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false
  });
};
