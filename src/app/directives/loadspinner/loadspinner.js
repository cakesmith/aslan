(function (loadspinner) {
  'use strict';

  loadspinner.controller('spinController', ['$scope', function ($scope) {

    $scope.numRects = 5;
    $scope.rects = [];

    for (var i = 1; i <= $scope.numRects; i++) {
      $scope.rects.push(i);
    }

  }]);

  loadspinner.directive('loadSpinner', function () {
    return {
      templateUrl: '/aslan/services/loadspinner/loadspinner.html',
      restrict   : 'EA',
      controller : 'spinController'
    };
  });

}(angular.module('aslan.loadspinner', [])));


