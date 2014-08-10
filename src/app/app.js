(function (aslan) {
  'use strict';

  aslan.directive('getHeight', function () {
    return {
      restrict: 'A',

      controller: function ($scope) {

        $scope.$on('getHeight', function () {
          $scope.$emit('returnHeight', $scope.element.offsetHeight);
        });

      },
      link      : function (scope, element) {
        scope.element = element[0];
      }
    }
  });

  aslan.run(function ($timeout, $window, $rootScope, duScrollOffset) {

    angular.element($window).bind('scroll', function () {
      $rootScope.$broadcast('scroll', this.pageYOffset);
      $rootScope.$apply();
    });

    //TODO change this to use a hidden div to check height instead of this abomination

    $rootScope.$on('darkened', function (event, dark) {
      if (dark === true) {
        $timeout(function () {
          $rootScope.$broadcast('getHeight');
        }, 50);
      } else {
        $window.scrollTo(0, 0);
      }
    });

    angular.element($window).bind('load', function () {
      $rootScope.$broadcast('darken', true);
    });

    $rootScope.$on('returnHeight', function (event, height) {
      duScrollOffset.set(height);
      $rootScope.$broadcast('darken', false);
    });

  });

  aslan.factory('duScrollOffset', function ($rootScope) {

    var offset = 0;

    $rootScope.$on('setOffset', function (event, newOffset) {
      console.log('received height ' + newOffset);
      offset = newOffset;
    });

    var service = function () {
      console.log('factory returning offset ' + offset);
      return offset;
    };

    service.set = function (value) {
      console.log('setting value ' + value);
      offset = value;
    };

    return service;

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
