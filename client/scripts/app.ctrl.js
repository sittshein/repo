/**
 * @ngdoc function
 * @name app.controller:AppCtrl
 * @description
 * # MainCtrl
 * Controller of the app
 */

(function() {
    'use strict';
    angular
      .module('app')
      .controller('AppCtrl', AppCtrl);

      AppCtrl.$inject  = ['$scope', '$localStorage', '$location', '$rootScope', '$anchorScroll', '$timeout', '$window'];

      function AppCtrl($scope, $localStorage, $location, $rootScope, $anchorScroll, $timeout, $window) {
        var vm = $scope;
        vm.isIE = isIE();
        vm.isSmart = isSmart();
        // config
        vm.app = {
          name: 'Flatkit',
          version: '1.1.0',
          // for chart colors
          color: {
            'primary':      '#0cc2aa',
            'accent':       '#a88add',
            'warn':         '#fcc100',
            'info':         '#6887ff',
            'success':      '#6cc788',
            'warning':      '#f77a99',
            'danger':       '#f44455',
            'white':        '#ffffff',
            'light':        '#f1f2f3',
            'dark':         '#2e3e4e',
            'black':        '#2a2b3c'
          },
          setting: {
            theme: {
              primary: 'primary',
              accent: 'accent',
              warn: 'warn'
            },
            folded: false,
            boxed: false,
            container: false,
            themeID: 1,
            bg: ''
          },

          homemenu: {
            caption: 'Home',
            parent: [ { 'name':'DashBoard', 'icon':'looks', 'state':'app.dashboard' } ]
          },

          surveymenu: {
            caption: 'Survey',
            parent: [ 
              { 'name':'Template', 'icon':'assignment', 'state':'app.survey.template', 'collapsed':true },
              { 'name':'Tracking', 'icon':'watch_later', 'state':'app.survey.tracking', 'collapsed':true },
              { 'name':'Statistics', 'icon':'show_chart', 'state':'app.statistics', 'collapsed':true },
              { 'name':'Submission', 'icon':'send', 'state':'app.survey.submission', 'collapsed':true }            
            ],
            child: [
              { 
                parentname:'Template',
                menuitem: [ 
                            { 'name':'Builder', 'icon':'edit', 'state':'app.survey.template.builder' },
                            { 'name':'Translator', 'icon':'language', 'state':'app.survey.template.translator' }
                          ]
              },
              { 
                parentname:'Tracking',
                menuitem: [ 
                            { 'name':'Individual Record', 'icon':'edit', 'state':'app.survey.tracking.individualrecord' },
                            { 'name':'JobOrder Assignment', 'icon':'language', 'state':'app.survey.tracking.joborderassignment' }
                          ]
              },
              { 
                parentname:'Statistics',
                menuitem: [ 
                            { 'name':'Scoring', 'icon':'language', 'state':'app.statistics.scoring' }
                          ]
              },
              {
                parentname:'Submission',
                menuitem: [ 
                            { 'name':'Email Contacts', 'icon':'email', 'state':'app.survey.submission.emailcontacts' }
                          ]
              }
            ]
          },

          menus: {
            home: [
              { 'name':'DashBoard', 'icon':'looks', 'state':'app.dashboard' }
            ],
            survey: [
              { 
                'name':'Template', 'icon':'assignment', 'state':'app.survey.template',
                menuitem: [ 
                            { 'name':'Builder', 'icon':'edit', 'state':'app.survey.template.builder' },
                            { 'name':'Translator', 'icon':'language', 'state':'app.survey.template.translator' }
                          ]
              },
              { 
                'name':'Tracking', 'icon':'watch_later', 'state':'app.survey.tracking',
                menuitem: [ 
                            { 'name':'Individual Record', 'icon':'edit', 'state':'app.survey.tracking.individualrecord' },
                            { 'name':'JobOrder Assignment', 'icon':'language', 'state':'app.survey.tracking.joborderassignment' }
                          ]
              }, 
              { 
                'name':'Statistics', 'icon':'show_chart', 'state':'app.statistics',
                menuitem: [ 
                            { 'name':'Scoring', 'icon':'language', 'state':'app.statistics.scoring' }
                          ]
              },
              {
                'name':'Submission', 'icon':'send', 'state':'app.survey.submission',
                menuitem: [ 
                            { 'name':'Email Contacts', 'icon':'email', 'state':'app.survey.submission.emailcontacts' }
                          ]
              }
            ],
            email: [
              { 'name':'Reply', 'icon':'reply', 'state':'app.email.reply'},
              { 
                'name':'Template', 'icon':'email', 'state':'app.email.template',
                menuitem: [ 
                            { 'name':'Editor', 'icon':'edit', 'state':'app.email.template.editor' },
                            { 'name':'Language', 'icon':'language', 'state':'app.email.template.language' }
                          ]
               }
            ],
            meeting: [
              { 'name':'Report Set', 'icon':'report', 'state':'app.dashboard'}, 
              { 'name':'Todo/Note', 'icon':'note_add', 'state':'app.dashboard'}, 
              { 'name':'KPI', 'icon':'insert_chart', 'state':'app.dashboard'}, 
              { 'name':'Score', 'icon':'stars', 'state':'app.dashboard'}
            ],
            departments: [
              { 'name':'Setup', 'icon':'library_add', 'state':'app.departments.setup'}
            ],
            users: [
              { 'name':'Admin', 'icon':'supervisor_account', 'state':'app.dashboard'}, 
              { 'name':'Property Agent', 'icon':'people', 'state':'app.dashboard'}, 
              { 'name':'Property Admin', 'icon':'person_outline', 'state':'app.dashboard'}, 
              { 'name':'Group Admin', 'icon':'group_add', 'state':'app.dashboard'}, 
              { 'name':'User', 'icon':'person_add', 'state':'app.dashboard'}
            ],
            outstandingstaff: [
              { 'name':'Staff List', 'icon':'account_circle', 'state':'app.dashboard'}
            ],
            guide: [
              { 'name':'Help', 'icon':'help_outline', 'state':'app.docs'}
            ],
            setting: [
              { 'name':'Themes', 'icon':'settings', 'state':'app.dashboard'}
            ]

          }
  
        };

        var setting = vm.app.name+'-Setting';
        // save settings to local storage
        if ( angular.isDefined($localStorage[setting]) ) {
          vm.app.setting = $localStorage[setting];
        } else {
          $localStorage[setting] = vm.app.setting;
        }
        // watch changes
        $scope.$watch('app.setting', function(){
          $localStorage[setting] = vm.app.setting;
        }, true);

        getParams('bg') && (vm.app.setting.bg = getParams('bg'));

        vm.setTheme = setTheme;
        setColor();
        
        function setTheme(theme){
          vm.app.setting.theme = theme.theme;
          setColor();
          if(theme.url){
            $timeout(function() {
              $window.location.href = theme.url;
            }, 100, false);
          }
        };

        function setColor(){
          vm.app.setting.color = {
            primary: getColor(vm.app.setting.theme.primary),
            accent: getColor(vm.app.setting.theme.accent),
            warn: getColor(vm.app.setting.theme.warn)
          };
        };

        function getColor(name){
          return vm.app.color[ name ] ? vm.app.color[ name ] : palette.find(name);
        };

        $rootScope.$on('$stateChangeSuccess', openPage);

        function openPage() {
          // goto top
          $location.hash('content');
          $anchorScroll();
          $location.hash('');
          // hide open menu
          $('#aside').modal('hide');
          $('body').removeClass('modal-open').find('.modal-backdrop').remove();
          $('.navbar-toggleable-sm').collapse('hide');
        };

        vm.goBack = function () {
          $window.history.back();
        };

        function isIE() {
          return !!navigator.userAgent.match(/MSIE/i) || !!navigator.userAgent.match(/Trident.*rv:11\./);
        }

        function isSmart(){
          // Adapted from http://www.detectmobilebrowsers.com
          var ua = $window['navigator']['userAgent'] || $window['navigator']['vendor'] || $window['opera'];
          // Checks for iOs, Android, Blackberry, Opera Mini, and Windows mobile devices
          return (/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/).test(ua);
        }

        function getParams(name) {
          name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
          var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
              results = regex.exec(location.search);
          return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
        }

      }
})();
