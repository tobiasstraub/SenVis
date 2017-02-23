(function() {
  'use strict';

  describe('The Patients Controller', function(){
    var vm, scope;

    beforeEach(module('senVis'));
    beforeEach(inject(function(_$rootScope_, _$controller_) {
      scope = _$rootScope_.$new();
      vm = _$controller_('PatientsController', {$scope: scope});
    }));

    describe('', function () {
      it('', function() {

      });
    });

  });
})();
