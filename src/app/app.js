(function (aslan) {
  'use strict';

  aslan.value('duScrollOffset', 49);

  aslan.controller('Services', ['$scope', function ($scope) {

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

  aslan.controller('AppCtrl', ['$scope', '$window', 'imageService', function ($scope, $window, imageService) {

    $scope.myInterval = 5000;
    $scope.slides = imageService.slides;

    var nav, dropDown;

    nav = dropDown = $scope.nav = $scope.dropDown = {};

    nav.isCollapsed = true;
    dropDown.isOpen = false;

    angular.element($window).bind('scroll', function () {
      nav.darken = this.pageYOffset > 50;
      $scope.$apply();
    });

    $scope.navClick = function ($event) {
      $event.preventDefault();
      $event.stopPropagation();
      nav.isCollapsed = true;
      dropDown.isOpen = false;
    };

    $scope.navToggle = function () {
      nav.isCollapsed = !nav.isCollapsed;
    };

  }]);


}(angular.module('aslan', [
  'aslan.image',
  'aslan.loader',
  'ngRoute',
  'ui.bootstrap',
  'duScroll',
  'aslan-templates'
])));
