(function () {
  'use strict';

  angular
    .module('senVis')
    .controller('PatientsController', PatientsController)
    .filter('maleFemaleFilter', function() {
      return function(input) {
        return parseInt(input, 10) ? 'weiblich' : 'männlich';
      }
    });

  function PatientsController($scope, $http, $location) {
    loadPatientData();

    function loadPatientData() {
      $http.get('http://unicorn:flycorn!@lab.tobiasstraub.com/senvis/api/patient').success(function (data) {
        $scope.Patients = data;
      });
    }

    $scope.redirectToPatientDetail = function(id) {
      $location.url('/patient?id=' + id);
    }
  }
})();

