(function () {
	'use strict';

	angular.module('app')
	  .config(function ($stateProvider) {
	    $stateProvider
	      .state('app.mall_management.store_editor', {
	        url: '/store_editor',
	        template: '<store-editor></store-editor>'
	      });
	  });

})(); 