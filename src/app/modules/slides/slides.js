(function (slide) {
  'use strict';

  slide.factory('buildSlides', function (images, slideDefaults) {

    return function (data) {

      var slides = [];

      var base = data ? data.base : slideDefaults.base;
      var prefix = data ? data.prefix : slideDefaults.prefix;
      var suffix = data ? data.suffix : slideDefaults.suffix;

      function build(image) {

        var built = {};

        angular.extend(built, image);

        built.selected = 0;

        built.url = image.url ? function () {
          return image.url;
        } :
          function (id) {
            var which = id ? this.ids[id] : this.ids[this.selected];
            return base + prefix + which + suffix;
          };

        built.selectNext = function () {
          if (this.ids.length > 1) {
            this.selected = (this.selected + 1) % this.ids.length;
          }
        };

        return built;
      }

      angular.forEach(images.slides, function (image) {

        slides.push(build(image));

      });

      return slides;

    };

  });


}(angular.module('aslan.slides', [
  'aslan.images',
  'aslan.values'
])));