(function (preloader) {
  'use strict';

  preloader.controller('preloadCtrl', function ($scope, slideService) {

    $scope.slides = slideService.slides;

  });

  preloader.directive('preloader', function () {

    return {
      template  : '<div ng-repeat="slide in slides">' +
        '<img ng-repeat="id in slide.ids track by $index" ng-src="{{ $parent.slide.url($index) }}" width="1" height="1">' +
        '</div>',
      controller: 'preloadCtrl',
      restrict  : 'E'
    }
  })

}(angular.module('aslan.preloader', [
  'aslan.slides'
])));