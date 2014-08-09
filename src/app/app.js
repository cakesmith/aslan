(function (aslan) {
  'use strict';


  aslan.run(function ($window, $rootScope) {

    angular.element($window).bind('scroll', function () {
      $rootScope.$broadcast('scroll', this.pageYOffset);
      $rootScope.$apply();
    });

    $window.scrollTo(0, 0);
  });

// override all local anchor links to use duSmoothScroll
  aslan.config(function ($provide) {
    $provide.decorator('aDirective', function ($delegate, duSmoothScrollDirective) {

      var duSmoothScroll = duSmoothScrollDirective[0];
      var directive = $delegate[0];
      var compile = directive.compile;

      directive.compile = function (element, attrs) {
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

  aslan.factory('duScrollOffset', function ($window) {
    return function () {
      if ($window.innerWidth > 767) {
        return 165;
      }
      else if ($window.innerWidth > 470) {
        return 90;
      }
      else if ($window.innerWidth > 333) {
        return 85;
      }
      else {
        return 105;
      }
    }
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
