(function (preloader) {
  'use strict';

  preloader.controller('preloadCtrl', function ($scope, buildSlides) {

    $scope.urls = [];

    angular.forEach(buildSlides(), function (slide) {
      angular.forEach(slide.ids, function (id, index) {
        $scope.urls.push(slide.url(index));
      });
    });
  });

  preloader.directive('preloader', function () {

    return {
      template: '<img ng-repeat="url in urls" ng-src="{{url}}" width="1" height="1">',
      controller: 'preloadCtrl',
      restrict  : 'E'
    }
  })

}(angular.module('aslan.preloader', [
  'aslan.slides'
])));