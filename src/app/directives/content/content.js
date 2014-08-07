(function (content) {
  'use strict';

  content.controller('ContentCtrl', function ($scope) {

    var base = '/aslan/templates/content/';

    $scope.sections = [
      {
        name: 'about',
        href: 'about.html'
      }
    ];

    angular.forEach($scope.sections, function (value) {
      value.href = base + value.href;
    });

  });

  content.directive('content', function () {
    return {
      restrict  : 'E',
      template  : '<div ng-repeat="section in sections" class="content section.name" ng-include="section.href"></div>',
      controller: 'ContentCtrl'
    };
  });

}(angular.module('aslan.content', [])));