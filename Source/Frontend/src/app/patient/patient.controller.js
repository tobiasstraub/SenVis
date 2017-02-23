(function () {
  'use strict';

  angular
    .module('senVis')
    .controller('PatientController', PatientController);

  /** @ngInject */
  function PatientController($scope, $interval, $http, $location) {
    var vm = this;
    vm.bufferQueueValue = [];
    vm.bufferQueueLabel = [];
    vm.leftNeigbor = null;
    //vm.bufferMaximum = document.getElementById('container').clientWidth / 2 || 300;
    vm.bufferMaximum = 300;
    vm.parseCsv = parseCsv;
    vm.isAnomaly = isAnomaly;
    vm.checkWithoutDependencies = checkWithoutDependencies;
    vm.checkWithDependencyNextNeighbor = checkWithDependencyNextNeighbor;
    vm.persistDataset = persistDataset;
    $scope.data = [[]];
    $scope.labels = [];

    $scope.options = {
      animation: {
        duration: 0
      },
      elements: {
        line: {
          borderWidth: 0.5
        },
        point: {
          radius: 0
        }
      },
      legend: {
        display: false
      },
      scales: {
        xAxes: [{
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Zeit in Millisekunden seit Beginn der Visualisierung'
          }
        }],
        yAxes: [{
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'EKG Amplitude'
          }
        }],
        gridLines: {
          display: false
        }
      },
      tooltips: {
        enabled: false
      }
    };

    parseCsv();
    $interval(executeVisualizationProcessing, 40); // 25 Frames per second (1 second == 1000 ms | 1000/25 = 40)

    function parseCsv() {
      var anomalyCounter = 0;
      Papa.parse("/assets/data.csv", {
        download: true,
        worker: true,
        step: function (row) {
          if(isAnomaly(row.data[0][1])) {
            //console.log("Detected possible anomaly at amplitude: " + row.data[0][1]);
            anomalyCounter++;
          } else {
            vm.bufferQueueValue.push(row.data[0][1]);
            vm.bufferQueueLabel.push(row.data[0][0]);
          }
        },
        complete: function () {
          for(var i=0; i < $scope.data[0].length; i++) {
            persistDataset($scope.data[0][i]);
          }
          //parseCsv(); // Release, when data array becomes empty
          //console.log("Removed " + anomalyCounter + " possible anomalies.\nAwesome! > Now get a cup of coffee :)");
        }
      });
    }

    function isAnomaly(datapoint) {
      if(checkWithoutDependencies(datapoint)) return true;
      if(checkWithDependencyNextNeighbor(datapoint)) return true;
      return false;
    }

    function checkWithoutDependencies(datapoint) {
      if(datapoint >= 1147.1) return true;
      if(datapoint <= -658.86) return true;
      return false;
    }

    function checkWithDependencyNextNeighbor(datapoint) {
      var tmpLeftNeigbor = vm.leftNeigbor;
      vm.leftNeigbor = datapoint;
      if(tmpLeftNeigbor == null) return false;
      var calculatedDivergence = tmpLeftNeigbor - datapoint;
      if(calculatedDivergence >= 150 || calculatedDivergence <= -150) return true;
      return false;
    }

    function executeVisualizationProcessing() {
      if ($scope.data[0].length) {
        $scope.labels = $scope.labels.slice(1);
        $scope.data[0] = $scope.data[0].slice(1);
      }

      while ($scope.data[0].length < vm.bufferMaximum) {
        $scope.labels.push(vm.bufferQueueLabel.shift());
        $scope.data[0].push(vm.bufferQueueValue.shift());
      }
    }

    function persistDataset(val) {
      var preparedJson = {'timestamp':'123545667435','amplitude':val,'patientId':'5'};
      $http({
        method: 'POST',
        url: 'http://unicorn:flycorn!@lab.tobiasstraub.com/senvis/api/vitalsign/new',
        data: angular.toJson(preparedJson),
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    $scope.redirectToPatientsList = function() {
      $location.url('/patients');
    }
  }
})();
