(function (slide) {
  'use strict';

  slide.factory('slideService', function () {

    var service = {

      base  : '/assets/images/',
      prefix: 'IMG_',
      suffix: '.JPG',

      slides: [
        {
          text: 'Commercial Lighting',
          href: '#commercial',
          ids : ['6571']
        },
        {
          text: 'Home Automation',
          href: '#automation',
          ids : ['6682']
        },
        {
          text: 'Design Engineering',
          href: '#engineering',
          ids : ['6683']
        },
        {
          text: 'Network Design',
          href: '#network',
          ids : ['6695']
        },
        {
          text: 'Municipal Services',
          href: '#municipal',
          ids : ['7152']
        },
        {
          text: 'Retrofit Upgrades',
          href: '#retrofit',
          ids : ['7211']
        },
        {
          text: 'Solar Energy',
          href: '#solar',
          ids : ['1001', '1002']
        }
      ]

    };

    function init(slide) {
      slide.selected = 0;

      var url = slide.url;

      slide.url = url ? function () {
        return url;
      } : function (id) {
        var which = id ? this.ids[id] : this.ids[this.selected];
        return service.base + service.prefix + which + service.suffix;
      };

      slide.selectNext = function () {
        if (slide.ids.length > 1) {
          slide.selected = (slide.selected + 1) % slide.ids.length;
        }
      };

    }

    angular.forEach(service.slides, function (slide) {

      init(slide);

    });


    return service;

  });


}(angular.module('aslan.slides', [])));