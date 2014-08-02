(function (loader) {

  loader.directive('loadSpinner', function () {
    return {
      templateUrl: '/aslan/services/loader/loader.html',
      restrict: 'AE'
    }
  });

}(angular.module('aslan.loader', [])));


