// code style: https://github.com/johnpapa/angular-styleguide 

(function() {
    'use strict';
    angular
      .module('app')
      .controller('XeditableCtrl', XeditableCtrl )
      .controller('ModalCtrl', ModalCtrl);
      
      XeditableCtrl.$inject = ['$scope', '$filter', '$http', 'editableOptions', 'editableThemes'];

      function XeditableCtrl($scope, $filter, $http, editableOptions, editableThemes){

        editableOptions.theme = 'bs3';
        editableOptions.icon_set = 'font-awesome';
        editableThemes.bs3.inputClass = 'form-control-sm';
        editableThemes.bs3.buttonsClass = 'btn-sm';

        var vm = $scope;

        vm.surveyTemplate = {
          title: 'My First Template',
          topics: [
            {
              topic: 'Topic Group 1',
              name: 't1',
              questioins: [
                {
                  id: '1',
                  type : 'Choice',
                  allowMultiple: false,
                  question : 'How did you find us?',
                  values: ['facebook', 'twitter', 'EDM', 'Television', 'Word of Mouth', 'Others']
                },
                {
                  id: '2',
                  type : 'Choice',
                  allowMultiple: true,
                  question : 'What do you love about us?',
                  values: ['Hospility', 'Friendly', 'Impression', 'Decoration', 'All']
                },
                {
                  id: '3',
                  type : 'text',
                  allowMultiple: false,
                  question : 'Which service you enjoyed the most?',
                  placeholder: 'Laundry, Room Service etc.'
                },
                {
                  id: '4',
                  type : 'text',
                  allowMultiple: true,
                  question : 'Feedback',
                  placeholder: 'Your feedbacks are important to us.'
                },
                {
                  id: '4',
                  type : 'staff',
                  question : 'Name of the staff who serve you',
                  placeholder: 'Name it'
                },
                {
                  id: '5',
                  type : 'weight',
                  question : 'Rate your experience with us',
                  values: [
                    {value: -2, description: 'Disaster'},
                    {value: -1, description: 'Bad'},
                    {value: 0, description: 'Neutral'},
                    {value: 1, description: 'Good'},
                    {value: 2, description: 'Awesome'},
                  ]
                }
              ]
            }
          ]
        }


        vm.states = ['Jane Roe', 'John Doe', 'Johnnie Doe', 'Janie Roe'];

        function showStatus() {
          var selected = $filter('filter')(vm.statuses, {value: vm.user.status});
          return (vm.user.status && selected.length) ? selected[0].text : 'Not set';
        };

        function showAgenda() {
          var selected = $filter('filter')(vm.agenda, {value: vm.user.agenda});
          return (vm.user.agenda && selected.length) ? selected[0].text : 'Not set';
        };

        function loadGroups() {
          return vm.groups.length ? null : $http.get('api/groups').success(function(data) {
            vm.groups = data;
          });
        };

        function showGroup(user) {
          if(user.group && vm.groups.length) {
            var selected = $filter('filter')(vm.groups, {id: user.group});
            return selected.length ? selected[0].text : 'Not set';
          } else {
            return user.groupName || 'Not set';
          }
        };

        function showStatus(user) {
          var selected = [];
          if(user && user.status) {
            selected = $filter('filter')(vm.statuses, {value: user.status});
          }
          return selected.length ? selected[0].text : 'Not set';
        }; 

        function checkName(data, id) {
          if (id === 2 && data !== 'awesome') {
            return "Username 2 should be `awesome`";
          }
        };

        function saveUser(data, id) {
          //vm.user not updated yet
          angular.extend(data, {id: id});
          // return $http.post('api/saveUser', data);
        };

        function removeUser(index) {
          vm.users.splice(index, 1);
        };

        function addUser() {
          vm.inserted = {
            id: vm.users.length+1,
            name: '',
            status: null,
            group: null 
          };
          vm.users.push(vm.inserted);
        };
      }

    ModalCtrl.$inject = ['$scope', '$modal'];
    function ModalCtrl($scope, $modal) {
      console.log($scope.question);
      
      // $scope.modal = $modal;//{title: 'Title', content: 'Hello Modal<br />This is a multiline message!'};

      // Controller usage example
      //
      // var myModal = $modal({title: 'Title', content: 'Hello Modal<br />This is a multiline message!', show: false});
      // $scope.showModal = function() {
      //   myModal.$promise.then(myModal.show);
      // };
      // $scope.hideModal = function() {
      //   myModal.$promise.then(myModal.hide);
      // };
    }
})();
