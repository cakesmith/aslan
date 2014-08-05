(function (preload) {
  'use strict';

  preload.controller('preloadCtrl', function ($scope, slideService) {

    $scope.slides = slideService.slides;

  });

}(angular.module('aslan.preload', [
  'aslan.slides'
])));