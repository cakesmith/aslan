(function (images) {

  images.factory('images', function () {

    var slides = [

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

    ];

    return {
      slides: slides
    };

  });
}(angular.module('aslan.images', [])));
