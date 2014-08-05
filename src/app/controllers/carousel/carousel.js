(function (carousel) {
  'use strict';

  carousel.config(function ($provide) {
    $provide.decorator('slideDirective', function ($delegate) {

      var directive = $delegate[0];

      directive.scope.fn = "&";

      var link = directive.link;

      directive.compile = function () {
        return function (scope, element, attrs, carouselCtrl) {
          scope.$watch('active', function (active) {
            if (active) {
              var slide = scope.$parent.slide;
              if (slide.ids.length > 1) {
                slide.selectNext();
              }
            }
          });
          link(scope, element, attrs, carouselCtrl);
        };
      };

      return $delegate;
    });
  });

  carousel.controller('CarouselCtrl', function ($scope, slideService) {

    $scope.myInterval = 5000;
    $scope.slides = slideService.slides;

  });

}(angular.module('aslan.carousel', [
  'aslan.slides',
  'ui.bootstrap'
])));