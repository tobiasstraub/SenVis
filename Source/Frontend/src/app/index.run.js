(function() {
  'use strict';

  angular
    .module('senVis')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
