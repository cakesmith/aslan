(function (navbar) {
  'use strict';


  navbar.controller('NavCtrl', function ($scope) {
    var nav, dropDown;

    nav = dropDown = $scope.nav = $scope.dropDown = {};

    nav.isCollapsed = true;
    nav.darken = false;
    dropDown.isOpen = false;

    $scope.$on('scroll', function (event, offset) {
      nav.darken = offset > 50;
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