(function() {
  'use strict';

  angular
    .module('senVis')
    .config(config)
    .config(['ChartJsProvider', function (ChartJsProvider) {
      // Configure all charts
      ChartJsProvider.setOptions({
        chartColors: ['#FF5252', '#0000FF'],
        responsive: true
      });
      // Configure all line charts
      ChartJsProvider.setOptions('line', {
        showLines: true
      });
    }]);

  /** @ngInject */
  function config($logProvider, toastrConfig) {
    // Enable log
    $logProvider.debugEnabled(true);

    // Set options third-party lib
    toastrConfig.allowHtml = true;
    toastrConfig.timeOut = 3000;
    toastrConfig.positionClass = 'toast-top-right';
    toastrConfig.preventDuplicates = true;
    toastrConfig.progressBar = true;
  }

})();
