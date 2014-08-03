(function (navbar) {
  'use strict';


  navbar.controller('NavCtrl', function ($scope, $window, $timeout) {
    var nav, dropDown;

    nav = dropDown = $scope.nav = $scope.dropDown = {};

    nav.isCollapsed = true;
    nav.darken = false;
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

  });

}(angular.module('aslan.navbar', [
])));