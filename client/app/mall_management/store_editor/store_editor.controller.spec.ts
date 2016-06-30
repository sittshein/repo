'use strict';

describe('Component: StoreEditorComponent', function () {

  // load the controller's module
  beforeEach(module('app'));

  var StoreEditorComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    StoreEditorComponent = $componentController('StoreEditorComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
