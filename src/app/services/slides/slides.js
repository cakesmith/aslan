(function (slide) {
  'use strict';

  slide.factory('slideService', function () {

    var slideService = function slideService(base, prefix, suffix) {

      var service = {

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
          return base + prefix + which + suffix;
        };

        slide.selectNext = function () {
          if (this.ids.length > 1) {
            this.selected = (this.selected + 1) % this.ids.length;
          }
        };

      }

      angular.forEach(service.slides, function (slide) {

        init(slide);

      });


      return service;

    };

    return slideService;


  });


}(angular.module('aslan.slides', [])));