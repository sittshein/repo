/**
 * @ngdoc function
 * @name app.config:uiRouter
 * @description
 * # Config
 * Config for the router
 */
(function() {
    'use strict';
    angular
      .module('app')
      .run(runBlock)
      .config(config);

      runBlock.$inject = ['$rootScope', '$state', '$stateParams'];
      function runBlock($rootScope,   $state,   $stateParams) {
          $rootScope.$state = $state;
          $rootScope.$stateParams = $stateParams;        
      }

      config.$inject =  ['$stateProvider', '$urlRouterProvider', '$locationProvider', 'MODULE_CONFIG'];
      function config( $stateProvider, $urlRouterProvider, $locationProvider, MODULE_CONFIG ) {
        
        var p = getParams('layout'),
            l = p ? p + '.' : '',
            layout = 'views/layout/layout.'+l+'html',
            dashboard = 'views/dashboard/dashboard.'+l+'html';

        $urlRouterProvider
          .otherwise('/app/dashboard');
          // $locationProvider.html5Mode(true).hashPrefix('!')
            
        $stateProvider
          .state('app', {
            abstract: true,
            url: '/app',
            views: {
              '': {
                templateUrl: layout
              }
            }
          })
            .state('app.dashboard', {
              url: '/dashboard',
              templateUrl: dashboard,
              resolve: load(['mgcrea.ngStrap','scripts/controllers/angularstrap.js'])
            })

            // custom routes
            .state('app.survey', {
              url: '/survey',
              template: '<div ui-view></div>'
            })
            .state('app.survey.template', {
              url: '/template',
              template: '<div ui-view></div>'
            })
            .state('app.survey.template.builder', {
              url: '/builder',
              views: {
                '' : {
                  templateUrl: '../views/custom/survey/template/template.builder.html',
                  controller: 'XeditableCtrl',
                  resolve: load(['xeditable','scripts/controllers/custom/survey/template/template.builder.js','mgcrea.ngStrap','scripts/controllers/angularstrap.js'])
                },
                'templatelist@app.survey.template.builder' : {
                  templateUrl: '../views/custom/survey/template/template.templatelist.html',
                  controller: 'TableCtrl',
                  resolve: load(['smart-table', 'scripts/controllers/table.js', 'mgcrea.ngStrap'])
                }
              },
              data : { title: 'Survey Template Builder' }
            })  
            .state('app.survey.template.translator', {
              url: '/translator',
              templateUrl: '../views/custom/survey/template/template.translator.html',
              data : { title: 'Template Translator' }
            })
            .state('app.survey.submission', {
              url: '/submission',
              template: '<div ui-view></div>'
            })
            .state('app.survey.submission.emailcontacts', {
              url: '/emailcontacts',
              templateUrl: '../views/custom/survey/submission/submission.emailcontacts.html',
              data : { title: 'Submission Email Contacts' }
            })
            .state('app.email', {
              url: '/email',
              template: '<div ui-view></div>'
            })
            .state('app.email.template', {
              url: '/template',
              template: '<div ui-view></div>'
            })
            .state('app.email.template.editor', {
              url: '/editor',
              templateUrl: '../views/custom/email/template/template.editor.html',
              data : { title: 'Email Template Editor' }
            })
            .state('app.email.template.language', {
              url: '/language',
              templateUrl: '../views/custom/email/template/template.language.html',
              data : { title: 'Email Template Language' }
            })
            // applications

            .state('app.contact', {
              url: '/contact',
              templateUrl: 'components/contact/main.html',
              data : { title: 'Contacts', hideFooter: true },
              controller: 'ContactCtrl',
              resolve: load('components/contact/contact.js')
            })

            .state('app.calendar', {
              url: '/calendar',
              templateUrl: 'components/calendar/main.html',
              data : { title: 'Calendar' },
              controller: 'FullcalendarCtrl',
              resolve: load(['moment','fullcalendar','ui.calendar','components/calendar/calendar.js'])
            })

            .state('app.todo', {
              url: '/todo',
              templateUrl: 'components/todo/todo.html',
              data : { title: 'Todo' },
              controller: 'TodoCtrl',
              resolve: load('components/todo/todo.js')
            })
            .state('app.todo.list', {
                url: '/{fold}'
            })

            .state('app.note', {
              url: '/note',
              templateUrl: 'components/note/main.html',
              data : { title: 'Note', hideFooter: true }
            })
            .state('app.note.list', {
              url: '/list',
              templateUrl: 'components/note/list.html',
              data : { title: 'Note'},
              controller: 'NoteCtrl',
              resolve: load(['components/note/note.js', 'moment'])
            })
            .state('app.note.item', {
              url: '/{id}',
              views: {
                '': {
                  templateUrl: 'components/note/item.html',
                  controller: 'NoteItemCtrl',
                  resolve: load(['components/note/note.js', 'moment'])
                }
              },
              data : { title: 'Note' }
            })

            // ui router
            .state('app.layout', {
              url: '/layout',
              template: '<div ui-view></div>'
            })
              .state('app.layout.header', {
                url: '/header',
                templateUrl: '../views/ui/headers.html',
                data : { title: 'Headers' }
              })
              .state('app.layout.aside', {
                url: '/aside',
                templateUrl: '../views/ui/asides.html',
                data : { title: 'Asides' }
              })
              .state('app.layout.footer', {
                url: '/footer',
                templateUrl: '../views/ui/footers.html',
                data : { title: 'Footers' }
              })

            .state('app.inbox', {
                url: '/inbox',
                templateUrl: 'components/inbox/main.html',
                data : { title: 'Inbox'},
                controller: 'MainCtrl',
                resolve: load( ['components/inbox/inbox.js','moment'] )
            })
            .state('app.inbox.list', {
                url: '/inbox/{fold}',
                templateUrl: 'components/inbox/list.html',
                controller: 'ListCtrl'
            })
            .state('app.inbox.item', {
                url: '/{id:[0-9]{1,4}}',
                templateUrl: 'components/inbox/item.html',
                controller: 'DetailCtrl'
            })
            .state('app.inbox.compose', {
                url: '/compose',
                templateUrl: 'components/inbox/new.html',
                controller: 'NewCtrl',
                resolve: load( ['summernote', 'ui.select'] )
            })

            // widget router
            .state('app.widget', {
              url: '/widget',
              templateUrl: '../views/ui/widget.html',
              data : { title: 'Widgets' }
            })

            // ui router
            .state('app.ui', {
              url: '/ui',
              template: '<div ui-view></div>'
            })
              .state('app.ui.arrow', {
                url: '/arrow',
                templateUrl: '../views/ui/arrow.html',
                data : { title: 'Arrows' }
              })
              .state('app.ui.box', {
                url: '/box',
                templateUrl: '../views/ui/box.html',
                data : { title: 'Box' }
              })
              .state('app.ui.label', {
                url: '/label',
                templateUrl: '../views/ui/label.html',
                data : { title: 'Labels' }
              })
              .state('app.ui.button', {
                url: '/button',
                templateUrl: '../views/ui/button.html',
                data : { title: 'Buttons' }
              })
              .state('app.ui.color', {
                url: '/color',
                templateUrl: '../views/ui/color.html',
                data : { title: 'Colors' }
              })
              .state('app.ui.dropdown', {
                url: '/dropdown',
                templateUrl: '../views/ui/dropdown.html',
                data : { title: 'Dropdowns' }
              })
              .state('app.ui.grid', {
                url: '/grid',
                templateUrl: '../views/ui/grid.html',
                data : { title: 'Grids' }
              })
              .state('app.ui.icon', {
                url: '/icons',
                templateUrl: '../views/ui/icon.html',
                data : { title: 'Icons' }
              })
              .state('app.ui.list', {
                url: '/list',
                templateUrl: '../views/ui/list.html',
                data : { title: 'Lists' }
              })
              .state('app.ui.modal', {
                url: '/modal',
                templateUrl: '../views/ui/modal.html',
                data : { title: 'Modals' }
              })
              .state('app.ui.nav', {
                url: '/nav',
                templateUrl: '../views/ui/nav.html',
                data : { title: 'Navs' }
              })
              .state('app.ui.progress', {
                url: '/progress',
                templateUrl: '../views/ui/progress.html',
                data : { title: 'Progress' }
              })
              .state('app.ui.social', {
                url: '/social',
                templateUrl: '../views/ui/social.html',
                data : { title: 'Social' }
              })
              .state('app.ui.sortable', {
                url: '/sortable',
                templateUrl: '../views/ui/sortable.html',
                data : { title: 'Sortable' }
              })
              .state('app.ui.streamline', {
                url: '/streamline',
                templateUrl: '../views/ui/streamline.html',
                data : { title: 'Streamlines' }
              })
              .state('app.ui.timeline', {
                url: '/timeline',
                templateUrl: '../views/ui/timeline.html',
                data : { title: 'Timelines' }
              })
              .state('app.ui.angularstrap', {
                url: '/angularstrap',
                templateUrl: '../views/ui/ng.angularstrap.html',
                data : { title: 'AngularStrap' },
                resolve: load(['mgcrea.ngStrap','scripts/controllers/angularstrap.js'])
              })
              .state('app.ui.bootstrap', {
                url: '/bootstrap',
                templateUrl: '../views/ui/ng.bootstrap.html',
                data : { title: 'UI Bootstrap' },
                resolve: load(['ui.bootstrap','scripts/controllers/bootstrap.js'])
              })
              .state('app.googlemap', {
                url: '/googlemap',
                templateUrl: '../views/ui/map.google.html',
                data : { title: 'Gmap', hideFooter: true },
                controller: 'GoogleMapCtrl',
                //resolve: load(['ui.map', 'scripts/controllers/googlemap.js'], function(){ })
                resolve: load(['ui.map', 'scripts/controllers/load-google-maps.js', 'scripts/controllers/googlemap.js'], function(){ return loadGoogleMaps(); })
              })
              .state('app.ui.vectormap', {
                url: '/vectormap',
                templateUrl: '../views/ui/map.vector.html',
                data : { title: 'Vector Map' },
                controller: 'ChartCtrl',
                resolve: load('scripts/controllers/chart.js')
              })

            // form routers
            .state('app.form', {
              url: '/form',
              template: '<div ui-view></div>'
            })
              .state('app.form.layout', {
                url: '/layout',
                templateUrl: '../views/form/form.layout.html',
                data : { title: 'Layouts' }
              })
              .state('app.form.element', {
                url: '/element',
                templateUrl: '../views/form/form.element.html',
                data : { title: 'Elements' }
              })              
              .state('app.form.validation', {
                url: '/validation',
                templateUrl: '../views/form/ng.validation.html',
                data : { title: 'Validations' }
              })
              .state('app.form.select', {
                url: '/select',
                templateUrl: '../views/form/ng.select.html',
                data : { title: 'Selects' },
                controller: 'SelectCtrl',
                resolve: load(['ui.select','scripts/controllers/select.js'])
              })
              .state('app.form.editor', {
                url: '/editor',
                templateUrl: '../views/form/ng.editor.html',
                data : { title: 'Editor' },
                controller: 'EditorCtrl',
                resolve: load(['summernote','scripts/controllers/editor.js'])
              })
              .state('app.form.slider', {
                url: '/slider',
                templateUrl: '../views/form/ng.slider.html',
                data : { title: 'Slider' },
                controller: 'SliderCtrl',
                resolve: load(['vr.directives.slider','scripts/controllers/slider.js'])
              })
              .state('app.form.tree', {
                url: '/tree',
                templateUrl: '../views/form/ng.tree.html',
                data : { title: 'Tree' },
                controller: 'TreeCtrl',
                resolve: load(['angularBootstrapNavTree','scripts/controllers/tree.js'])
              })
              .state('app.form.file-upload', {
                url: '/file-upload',
                templateUrl: '../views/form/ng.file-upload.html',
                data : { title: 'File upload' },
                controller: 'UploadCtrl',
                resolve: load(['angularFileUpload', 'scripts/controllers/upload.js'])
              })
              .state('app.form.image-crop', {
                url: '/image-crop',
                templateUrl: '../views/form/ng.image-crop.html',
                data : { title: 'Image Crop' },
                controller: 'ImgCropCtrl',
                resolve: load(['ngImgCrop','scripts/controllers/imgcrop.js'])
              })
              .state('app.form.editable', {
                url: '/editable',
                templateUrl: '../views/form/ng.xeditable.html',
                data : { title: 'Xeditable' },
                controller: 'XeditableCtrl',
                resolve: load(['xeditable','scripts/controllers/xeditable.js'])
              })

            // table routers
            .state('app.table', {
              url: '/table',
              template: '<div ui-view></div>'
            })
              .state('app.table.static', {
                url: '/static',
                templateUrl: '../views/table/static.html',
                data : { title: 'Static' }
              })
              .state('app.table.datatable', {
                url: '/datatable',
                data : { title: 'Datatable' },
                templateUrl: '../views/table/datatable.html'
              })
              .state('app.table.footable', {
                url: '/footable',
                data : { title: 'Footable' },
                templateUrl: '../views/table/footable.html'
              })
              .state('app.table.smart', {
                url: '/smart',
                templateUrl: '../views/table/ng.smart.html',
                data : { title: 'Smart' },
                controller: 'TableCtrl',
                resolve: load(['smart-table', 'scripts/controllers/table.js'])
              })
              .state('app.table.uigrid', {
                url: '/uigrid',
                templateUrl: '../views/table/ng.uigrid.html',
                data : { title: 'UI Grid' },
                controller: "UiGridCtrl",
                resolve: load(['ui.grid', 'scripts/controllers/uigrid.js'])
              })
              .state('app.table.editable', {
                url: '/editable',
                templateUrl: '../views/table/ng.editable.html',
                data : { title: 'Editable' },
                controller: 'XeditableCtrl',
                resolve: load(['xeditable','scripts/controllers/xeditable.js'])
              })

            // chart
            .state('app.chart', {
              url: '/chart',
              templateUrl: '../views/chart/chart.html',
              data : { title: 'Charts' },
              controller: "ChartCtrl",
              resolve: load('scripts/controllers/chart.js')
            })
            .state('app.echarts', {
              url: '/echarts',
              template: '<div ui-view></div>'
            })
            .state('app.echarts.line', {
              url: '/line',
              templateUrl: '../views/chart/echarts-line.html',
              data : { title: 'Echarts Line' }
            })
            .state('app.echarts.bar', {
              url: '/bar',
              templateUrl: '../views/chart/echarts-bar.html',
              data : { title: 'Echarts Bar' }
            })
            .state('app.echarts.pie', {
              url: '/pie',
              templateUrl: '../views/chart/echarts-pie.html',
              data : { title: 'Echarts Pie' }
            })
            .state('app.echarts.scatter', {
              url: '/scatter',
              templateUrl: '../views/chart/echarts-scatter.html',
              data : { title: 'Echarts Scatter' }
            })
            .state('app.echarts.rc', {
              url: '/rc',
              templateUrl: '../views/chart/echarts-radar-chord.html',
              data : { title: 'Radar & Chord' }
            })
            .state('app.echarts.gf', {
              url: '/gf',
              templateUrl: '../views/chart/echarts-gauge-funnel.html',
              data : { title: 'Gauge & Funnel' }
            })
            .state('app.echarts.map', {
              url: '/map',
              templateUrl: '../views/chart/echarts-map.html',
              data : { title: 'Map' }
            })

          .state('app.page', {
            url: '/page',
            template: '<div ui-view></div>'
          })
            .state('app.page.profile', {
              url: '/profile',
              templateUrl: '../views/page/profile.html',
              data : { title: 'Profile' }
            })
            .state('app.page.setting', {
              url: '/setting',
              templateUrl: '../views/page/setting.html',
              data : { title: 'Setting' }
            })
            .state('app.page.search', {
              url: '/search',
              templateUrl: '../views/page/search.html',
              data : { title: 'Search' }
            })
            .state('app.page.faq', {
              url: '/faq',
              templateUrl: '../views/page/faq.html',
              data : { title: 'FAQ' }
            })
            .state('app.page.gallery', {
              url: '/gallery',
              templateUrl: '../views/page/gallery.html',
              data : { title: 'Gallery' }
            })
            .state('app.page.invoice', {
              url: '/invoice',
              templateUrl: '../views/page/invoice.html',
              data : { title: 'Invoice' }
            })
            .state('app.page.price', {
              url: '/price',
              templateUrl: '../views/page/price.html',
              data : { title: 'Price' }
            })
            .state('app.page.blank', {
              url: '/blank',
              templateUrl: '../views/page/blank.html',
              data : { title: 'Blank' }
            })
            .state('app.docs', {
              url: '/docs',
              templateUrl: '../views/page/docs.html',
              data : { title: 'Documents' }
            })
            .state('404', {
              url: '/404',
              templateUrl: '../views/misc/404.html'
            })
            .state('505', {
              url: '/505',
              templateUrl: '../views/misc/505.html'
            })
            .state('access', {
              url: '/access',
              template: '<div class="dark bg-auto w-full"><div ui-view class="fade-in-right-big smooth pos-rlt"></div></div>'
            })
            .state('access.signin', {
              url: '/signin',
              templateUrl: '../views/misc/signin.html'
            })
            .state('access.signup', {
              url: '/signup',
              templateUrl: '../views/misc/signup.html'
            })
            .state('access.forgot-password', {
              url: '/forgot-password',
              templateUrl: '../views/misc/forgot-password.html'
            })
            .state('access.lockme', {
              url: '/lockme',
              templateUrl: '../views/misc/lockme.html'
            })
          ;

        function load(srcs, callback) {
          return {
              deps: ['$ocLazyLoad', '$q',
                function( $ocLazyLoad, $q ){
                  var deferred = $q.defer();
                  var promise  = false;
                  srcs = angular.isArray(srcs) ? srcs : srcs.split(/\s+/);
                  if(!promise){
                    promise = deferred.promise;
                  }
                  angular.forEach(srcs, function(src) {
                    promise = promise.then( function(){
                      angular.forEach(MODULE_CONFIG, function(module) {
                        if( module.name == src){
                          src = module.module ? module.name : module.files;
                        }
                      });
                      return $ocLazyLoad.load(src);
                    } );
                  });
                  deferred.resolve();
                  return callback ? promise.then(function(){ return callback(); }) : promise;
              }]
          }
        }

        function getParams(name) {
            name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
                results = regex.exec(location.search);
            return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
        }
      }
})();
