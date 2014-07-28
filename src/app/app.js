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
