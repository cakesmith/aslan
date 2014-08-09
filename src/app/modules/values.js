(function (values) {
  'use strict';

//  values.constant('duScrollOffset', 95);

//  values.factory('duScrollOffset', function($window) {
//    console.log('request');
//    return 95;
//  });

  values.value('slideDefaults', {
    base  : '/assets/images/',
    prefix: 'IMG_',
    suffix: '.JPG'
  });

}(angular.module('aslan.values', [])));