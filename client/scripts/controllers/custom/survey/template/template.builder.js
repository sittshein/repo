// code style: https://github.com/johnpapa/angular-styleguide 

(function() {
    'use strict';
    angular
      .module('app')
      .controller('XeditableCtrl', XeditableCtrl )
      .controller('QuestionCtrl', QuestionCtrl);
      
      XeditableCtrl.$inject = ['$scope', '$filter', '$http', 'editableOptions', 'editableThemes'];

      function XeditableCtrl($scope, $filter, $http, editableOptions, editableThemes){

        editableOptions.theme = 'bs3';
        editableOptions.icon_set = 'font-awesome';
        editableThemes.bs3.inputClass = 'form-control-sm';
        editableThemes.bs3.buttonsClass = 'btn-sm';

        var vm = $scope;
        vm.answerTypes = [
          {value: 'choice', label: '<i class="fa fa-check-circle m-r-md"></i> Choice'},
          {value: 'open', label: '<i class="fa fa-comments m-r-md"></i> Open'},
          {value: 'staff', label: '<i class="fa fa-users m-r-md"></i> Staff'},
          {value: 'weight', label: '<i class="fa fa-star-half-o m-r-md"></i> Weight'}
        ]
        vm.surveyTemplate = {
          title: 'My First Template',
          topics: [
            {
              topic: 'Topic Group 1',
              name: 't1',
              questions: [
                {
                  id: '1',
                  answerType : 'choice',
                  allowMultiple: false,
                  question : 'How did you find us?',
                  answers: [
                    {id:1, name: 'facebook'},
                    {id:2, name: 'twitter'},
                    {id:3, name: 'EDM'},
                    {id:4, name: 'Television'},
                    {id:5, name: 'Word of Mouth'},
                    {id:6, name: 'Others'}
                  ],
                  questionType: 'regular'
                },
                {
                  id: '2',
                  answerType : 'choice',
                  allowMultiple: true,
                  question : 'What do you love about us?',
                  answers: [
                    {id:1, name: 'Hospility'},
                    {id:2, name: 'Friendly'},
                    {id:3, name: 'Impression'},
                    {id:4, name: 'Decoration'},
                    {id:5, name: 'All'}
                  ]
                },
                {
                  id: '3',
                  answerType : 'open',
                  allowMultiple: false,
                  question : 'Which service you enjoyed the most?',
                  placeholder: 'Laundry, Room Service etc.'
                },
                {
                  id: '4',
                  answerType : 'open',
                  allowMultiple: true,
                  question : 'Feedback',
                  placeholder: 'Your feedbacks are important to us.'
                },
                {
                  id: '5',
                  answerType : 'staff',
                  question : 'Name of the staff who serve you',
                  placeholder: 'Name it'
                },
                {
                  id: '6',
                  answerType : 'weight',
                  question : 'Rate your experience with us',
                  answers: [
                    {id:1, weight: -2, name: 'Disaster'},
                    {id:2, weight: -1, name: 'Bad'},
                    {id:3, weight: 0, name: 'Neutral'},
                    {id:4, weight: 1, name: 'Good'},
                    {id:5, weight: 2, name: 'Awesome'}
                  ]
                }
              ]
            }
          ]
        }


        vm.staff = ['Jane Roe', 'John Doe', 'Johnnie Doe', 'Janie Roe'];

        // function showStatus() {
        //   var selected = $filter('filter')(vm.statuses, {value: vm.user.status});
        //   return (vm.user.status && selected.length) ? selected[0].text : 'Not set';
        // };

        // function showAgenda() {
        //   var selected = $filter('filter')(vm.agenda, {value: vm.user.agenda});
        //   return (vm.user.agenda && selected.length) ? selected[0].text : 'Not set';
        // };

        // function loadGroups() {
        //   return vm.groups.length ? null : $http.get('api/groups').success(function(data) {
        //     vm.groups = data;
        //   });
        // };

        // function showGroup(user) {
        //   if(user.group && vm.groups.length) {
        //     var selected = $filter('filter')(vm.groups, {id: user.group});
        //     return selected.length ? selected[0].text : 'Not set';
        //   } else {
        //     return user.groupName || 'Not set';
        //   }
        // };

        // function showStatus(user) {
        //   var selected = [];
        //   if(user && user.status) {
        //     selected = $filter('filter')(vm.statuses, {value: user.status});
        //   }
        //   return selected.length ? selected[0].text : 'Not set';
        // }; 

        // function checkName(data, id) {
        //   if (id === 2 && data !== 'awesome') {
        //     return "Username 2 should be `awesome`";
        //   }
        // };

        // function saveUser(data, id) {
        //   //vm.user not updated yet
        //   angular.extend(data, {id: id});
        //   // return $http.post('api/saveUser', data);
        // };

        // function removeUser(index) {
        //   vm.users.splice(index, 1);
        // };

        // function addUser() {
        //   vm.inserted = {
        //     id: vm.users.length+1,
        //     name: '',
        //     status: null,
        //     group: null 
        //   };
        //   vm.users.push(vm.inserted);
        // };
      }

    QuestionCtrl.$inject = ['$scope', '$modal'];
    function QuestionCtrl($scope, $modal) {
      var vm = $scope;
      vm.saveAnswer = function saveAnswer(index, data, answer) {
        vm.inserted = {};
        //vm.user not updated yet
        angular.extend(data, {id: answer.id});
        // return $http.post('api/saveUser', data);
      };

      vm.cancelAnswer = function cancelAnswer(index, data, answer) {
        if (vm.inserted == answer)
        {
          vm.removeAnswer(index);
        }
      };

      vm.removeAnswer = function removeAnswer(index) {
        vm.question.answers.splice(index, 1);
      };

      vm.addAnswer = function addAnswer() {
        vm.inserted = {id: vm.question.answers.length+1, name: ''};
        vm.question.answers.push(vm.inserted);
      }
//      console.log($scope.question);
      
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
