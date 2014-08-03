(function (aslan) {
  'use strict';

  aslan.value('duScrollOffset', 49);


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

}(angular.module('aslan', [
  'aslan.controllers',
  'aslan.services',
  'ngRoute',
  'ngTouch',
  'ui.bootstrap',
  'duScroll',
  'aslan-templates'
])));
