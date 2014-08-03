(function (loader) {
  'use strict';

  loader.controller('spinController', ['$scope', function ($scope) {

    $scope.numRects = 5;
    $scope.rects = [];

    for (var i = 1; i <= $scope.numRects; i++) {
      $scope.rects.push(i);
    }

  }]);

  loader.directive('loadSpinner', function () {
    return {
      templateUrl: '/aslan/services/loader/loader.html',
      restrict   : 'EA',
      controller : 'spinController'
    };
  });

}(angular.module('aslan.loader', [])));


