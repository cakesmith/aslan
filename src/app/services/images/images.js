(function (images) {
  'use strict';

  images.factory('images', function () {

    var slides = [

      {
        text  : 'Commercial',
        href  : '#commercial',
        ids: ['6571', '6606']
      },

      {
        text: 'Fire Alarm',
        href: '#firealarm',
        ids : ['1000']
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
        ids : ['7227', '7164']
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

    ];

    return {
      slides: slides
    };

  });
}(angular.module('aslan.images', [])));
