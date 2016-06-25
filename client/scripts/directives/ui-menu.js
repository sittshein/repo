(function() {
  'use strict';

  function uiMenu() {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        datasource: '='
      },
      templateUrl: './views/blocks/menu.html',
      controller: function($scope) {
        $scope.caption= $scope.datasource.caption;
        $scope.parents= $scope.datasource.parent;
        $scope.childs= $scope.datasource.child;
      }
    };
  }
  function uiMenuCaption() {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        caption: '@text'
      },
      template: '<li class="nav-header hidden-folded"><small class="text-muted">{{caption}}</small></li>'
    };
  }
  function uiMenuSubmenu() {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        parent: '=data',
        childObj: '=submenu'
      },
      templateUrl: './views/blocks/menu-submenu.html',
      controller: function($scope) {
        $scope.parentname = $scope.parent.name;
        $scope.submenu = {};
        // console.log($scope.parentname);
        if($scope.childObj) {
          $scope.childObj = $scope.childObj.filter(function(item){
            if (item.parentname === $scope.parentname) {
              $scope.submenu=item.menuitem;
            }

          });
        }
      // console.log($scope.submenu);
      }
    };
  }
  function onRepeatDone() {
    return {
      restrict: 'A',
      link: link
    }
  }
  function link(scope, el, attrs) {
    scope.$emit(attrs['onRepeatDone'], el);
  }

  angular
    .module('app')
    .directive('uiMenu', uiMenu)
    .directive('uiMenuCaption', uiMenuCaption)
    .directive('uiMenuSubmenu', uiMenuSubmenu)
    .directive('onRepeatDone', onRepeatDone);

})();
