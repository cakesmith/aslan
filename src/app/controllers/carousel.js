(function(carousel) {

  carousel.controller('CarouselCtrl', function($scope, imageService) {

    $scope.myInterval = 5000;
    $scope.slides = imageService.slides;

  })

}(angular.module('aslan.carousel',[
  'aslan.image'
])));