(function (aslan) {
  'use strict';


  aslan.run(function ($timeout, $window, $rootScope) {

    angular.element($window).bind('scroll', function () {
      $rootScope.$broadcast('scroll', this.pageYOffset);
      $rootScope.$apply();
    });

    angular.element($window).bind('resize', function () {
      $rootScope.$broadcast('checkHeight');
    });


  });

  aslan.factory('duScrollOffset', function ($rootScope, snHeight) {


    return function () {
      console.log('returning ' + snHeight.height);
      return snHeight.height;
    };


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
