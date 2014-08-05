(function (image) {
  'use strict';

  image.factory('imageService', function () {

    var service = {

      base  : 'http://gdriv.es/aslanelectric/',
      prefix: 'img_',
      suffix: '.jpg',
      slides: [],

      images: [
        {
          text: 'Commercial Lighting',
          href: '#commercial',
          ids : ['6571'],
          type: 'slide'
        },
        {
          text: 'Home Automation',
          href: '#automation',
          ids : ['6682'],
          type: 'slide'
        },
        {
          text: 'Design Engineering',
          href: '#engineering',
          ids : ['6683'],
          type: 'slide'
        },
        {
          text: 'Network Design',
          href: '#network',
          ids : ['6695'],
          type: 'slide'
        },
        {
          text: 'Municipal Services',
          href: '#municipal',
          ids : ['7152'],
          type: 'slide'
        },
        {
          text: 'Retrofit Upgrades',
          href: '#retrofit',
          ids : ['7211'],
          type: 'slide'
        }
      ]

    };

    function randomUpTo(num) {
      if (num === 0) {
        return 0;
      } else {
        return Math.floor(Math.random() * 10) % num;
      }
    }

    function createUrl(value) {
      return service.base + service.prefix + value.ids[randomUpTo(value.ids.length - 1)] + service.suffix;
    }

    function init() {
      service.slides = [];
      angular.forEach(service.images, function (value) {
        value.url = createUrl(value);
        if (value.type === 'slide') {
          service.slides.push(value);
        }
      });
    }

    service.init = init;
    init();
    return service;

  });


}(angular.module('aslan.image', [])));