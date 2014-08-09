(function (content) {
  'use strict';

  content.controller('ContentCtrl', function ($scope) {

    var base = '/aslan/templates/content/';

    $scope.sections = [
      {
        name: 'header',
        href: 'header.html'
      },
      {
        name: 'commercial',
        href: 'commercial.html'

      },
      {
        name: 'fire',
        href: 'firealarm.html'
      },
      {
        name: 'about',
        href: 'about.html'
      },
      {
        name: 'contact',
        href: 'contact.html'
      }
    ];

    angular.forEach($scope.sections, function (value) {
      value.href = base + value.href;
    });

  });

  content.directive('content', function () {
    return {
      restrict  : 'E',
      template  : '<div class="content"><div ng-repeat="section in sections" ng-class="section.name" ng-include="section.href"></div></div>',
      controller: 'ContentCtrl'
    };
  });

}(angular.module('aslan.content', [])));