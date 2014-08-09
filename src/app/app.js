(function (aslan) {
  'use strict';


  aslan.run(function ($timeout, $window, $rootScope) {

    angular.element($window).bind('scroll', function () {
      $rootScope.$broadcast('scroll', this.pageYOffset);
      $rootScope.$apply();
    });

  });

  aslan.factory('scrollOffset', function () {

    var offset = 110;

    var service = function () {
      return offset;
    };

    service.set = function (value) {
      offset = value;
    };

    return service;

  });

// override all local anchor links to use duSmoothScroll
  aslan.config(function ($provide) {
    $provide.decorator('aDirective', function ($delegate, duSmoothScrollDirective, scrollOffset) {

      var duSmoothScroll = duSmoothScrollDirective[0];
      var directive = $delegate[0];
      var compile = directive.compile;

      directive.compile = function (element, attrs) {

        attrs.$set('offset', scrollOffset());

        if (attrs.duSmoothScroll === undefined) {
          compile(element, attrs);
          return function (scope, element, attrs) {
            duSmoothScroll.link(scope, element, attrs);
          };
        } else {
          return compile(element, attrs);
        }
      };

      return $delegate;
    });
  });


}(angular.module('aslan', [
  'aslan.directives',
  'aslan.controllers',
  'aslan.services',
  'aslan.values',
  'ngRoute',
  'ngTouch',
  'ui.bootstrap',
  'duScroll',
  'aslan-templates'
])));
