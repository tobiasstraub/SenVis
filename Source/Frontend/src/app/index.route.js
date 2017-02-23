(function() {
  'use strict';

  angular
    .module('senVis')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      });

    $stateProvider
      .state('patient', {
        url: '/patient',
        templateUrl: 'app/patient/patient.html',
        controller: 'PatientController',
        controllerAs: 'patient'
      });

    $stateProvider
      .state('patients', {
        url: '/patients',
        templateUrl: 'app/patients/patients.html',
        controller: 'PatientsController',
        controllerAs: 'patients'
      });

    $urlRouterProvider.otherwise('/patients');
  }

})();
