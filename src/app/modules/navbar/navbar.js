(function (navbar) {
  'use strict';

  navbar.controller('NavCtrl', function ($scope) {

    var nav, dropDown;

    $scope.services = [
      {
        text: 'Commercial',
        href: '#commercial'
      },
      {
        text: 'Fire Alarm',
        href: '#fire'
      },
      {
        text: 'Automation',
        href: '#automation'
      },
      {
        text: 'Engineering',
        href: '#engineering'
      },
      {
        text: 'Network',
        href: '#network'
      },
      {
        text: 'Municipal',
        href: '#municipal'
      },
      {
        text: 'Retrofit',
        href: '#retrofit'
      },
      {
        text: 'Solar',
        href: '#solar'
      }
    ];

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