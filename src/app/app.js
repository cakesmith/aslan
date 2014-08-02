(function(aslan) {
  'use strict';

  aslan.value('duScrollOffset', 49);

  aslan.controller('Services', ['$scope', function($scope) {

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

  aslan.controller('AppCtrl', ['$scope', '$window', function($scope, $window) {

      $scope.myInterval = 5000;
      var slides = $scope.slides = [];

    var images = [
      {
        label: 'Commercial Lighting',
        img: '6571'
      },
      {
        label: 'Home Automation',
        img: '6682'
      },
      {
        label: 'Design Engineering',
        img: '6683'
      },
      {
        label: 'Network Design',
        img: '6695'
      },
      {
        label: 'Municipal Services',
        img: '7152'
      },
      {
        label: 'Retrofit Upgrades',
        img: '7211'
      }
    ];

    var base = 'http://gdriv.es/aslanelectric/img_';
//    var base = 'http://gdriv.es/aslanelectric/_';

    angular.forEach(images, function(value) {
      slides.push({
        image: base + value.img + '.jpg',
        text: value.label
      });
    });

    var nav, dropDown;

    nav = dropDown = $scope.nav = $scope.dropDown = {};

    nav.isCollapsed = true;
    dropDown.isOpen = false;

    angular.element($window).bind('scroll', function () {
      nav.darken = this.pageYOffset > 50;
      $scope.$apply();
    });

    $scope.navClick = function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      nav.isCollapsed = true;
      dropDown.isOpen = false;
    };

    $scope.navToggle = function() {
      nav.isCollapsed = !nav.isCollapsed;
    };

  }]);


}(angular.module('aslan', [
  'aslan.loader',
  'ngRoute',
  'ui.bootstrap',
  'duScroll',
  'aslan-templates'
])));
