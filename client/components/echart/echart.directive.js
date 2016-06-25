(function () {
	'use strict';
	

    angular
        .module('app')
		.directive('echart', echart);

	function echart() {
		return {
			templateUrl: 'components/echart/echart.html',
			restrict: 'EA',
			link: function(scope, element, attrs) {
			}
		};
	};

})(); 

