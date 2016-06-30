(function(){
	'use strict';

	function StoreEditorComponent() {
		var vm = this;

		vm.message = 'Hello';
		vm.disabled = true;
		vm.options = { airMode: false };

		vm.airmodeControl = function(){
			vm.disabled = !vm.disabled;
			if(!vm.disabled) {
				vm.options = { airMode: true };	
			}
			else {
				vm.options = { airMode: false };	
			}
			
			console.log(vm.disabled);	
		}
	  
	}

	angular.module('app')
	  .component('storeEditor', {
	    templateUrl: 'app/mall_management/store_editor/store_editor.html',
	    controller: StoreEditorComponent,
	    controllerAs: 'vm'
	  });

})();
