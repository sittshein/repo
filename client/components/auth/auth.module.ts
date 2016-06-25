'use strict';

angular.module('tempApp.auth', [
  'tempApp.constants',
  'tempApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
