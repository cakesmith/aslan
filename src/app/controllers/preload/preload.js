(function (preload) {
  'use strict';

  preload.controller('preloadCtrl', function ($scope, imageService) {

    $scope.images = imageService.images;

  });

}(angular.module('aslan.preload', [
  'aslan.image'
])));