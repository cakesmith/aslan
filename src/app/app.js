(function (aslan) {
  'use strict';

  aslan.value('duScrollOffset', 49);

  aslan.run(function ($window, $rootScope) {

    angular.element($window).bind('scroll', function () {
      $rootScope.$broadcast('scroll', this.pageYOffset);
      $rootScope.$apply();
    });

    $window.scrollTo(0, 0);
  });

  aslan.controller('AppCtrl', ['$scope', function ($scope) {

    $scope.services = [
      {
        text: 'Industrial Controls',
        href: '#industrial'
      },
      {
        text: 'Commercial Lighting',
        href: '#commercial'
      }
    ];

  }]);

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
  'aslan.controllers',
  'aslan.services',
  'ngRoute',
  'ngTouch',
  'ui.bootstrap',
  'duScroll',
  'aslan-templates'
])));
