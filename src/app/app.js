(function(aslan) {

  aslan.controller('Services', ['$scope', function($scope) {

    $scope.services = [
      {
        text: "Industrial Controls",
        href: "#industrial"
      },
      {
        text: "Commercial Lighting",
        href: "#commercial"
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

    angular.forEach(images, function(value) {
      slides.push({
        image: base + value.img + '.jpg',
        text: value.label
      });
    });



    $scope.nav = $scope.dropDown= {};

    $scope.nav.isCollapsed = true;

    $scope.dropDown.isOpen = false;

    angular.element($window).bind('scroll', function () {
      $scope.nav.darken = this.pageYOffset > 50;
      $scope.$apply();
    });

    $scope.navClick = function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.nav.isCollapsed = true;
      $scope.dropDown.isOpen = false;
    };

    $scope.navToggle = function() {
      $scope.nav.isCollapsed = !$scope.nav.isCollapsed;
    };

  }]);

  aslan.value('duScrollOffset', 49);


}(angular.module('aslan', [
  'ngRoute',
  'ui.bootstrap',
  'duScroll',
  'aslan-templates'
])));
