(function() {
  'use strict';

  describe('The Patients information', function(){
    var given, scope;

    beforeEach(module('senVis'));
    beforeEach(inject(function(_$rootScope_, _$controller_) {
      scope = _$rootScope_.$new();
      given = _$controller_('PatientController', {$scope: scope});

      // DOM Mocks
      /*var dc = document.createElement('div');
      dc.id = 'container';
      Object.defineProperty(dc, 'clientWidth', {
        value: 400
      });
      document.getElementsByClassName('container')[0].appendChild(dc);*/
    }));

    describe('should be free of anomalies', function () {
      it('by checking left neighbor datapoint is initial in an empty state', function () {
        expect(given.leftNeigbor).toBeNull();
      });

      it('should guarantee live data available', function() {
        spyOn(given, 'parseCsv').and.callThrough();
        given.parseCsv();
        expect(given.parseCsv).toHaveBeenCalled();
      });
    });

    describe('should guarantee there is enough place for the information', function () {
      it('by checking buffer size is not lesser than 300', function () {
        expect(given.bufferMaximum).not.toBeLessThan(300);
      });

      it('by checking the historical information are written in the database', function () {
        spyOn(given, 'persistDataset').and.callThrough();
        given.persistDataset();
        expect(given.persistDataset).toHaveBeenCalled();
      });
    });
  });
})();
