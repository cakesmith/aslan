(function (smartnav) {

  smartnav.directive('smartnav', function (snHeight) {
    return {
      restrict  : 'E',
      controller: function ($scope, snHeight) {
        $scope.$on('checkHeight', function () {
          snHeight.set($scope.element.offsetHeight);
        });
      },
      link      : function (scope, element) {
        scope.element = element[0];
        snHeight.set(element[0].offsetHeight);
      }
    }
  });

  smartnav.factory('snHeight', function () {

    var service = {};

    service.height = 0;

    service.set = function (height) {
      service.height = height;
    };

    return service;


  })

}(angular.module('aslan.smartnav', [])));