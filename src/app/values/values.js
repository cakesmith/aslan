(function (values) {
  'use strict';

  values.constant('duScrollOffset', 49);

  values.value('slideDefaults', {
    base  : '/assets/images/',
    prefix: 'IMG_',
    suffix: '.JPG'
  });

}(angular.module('aslan.values', [])));