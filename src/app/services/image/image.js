(function (image) {

  image.factory('imageService', function () {

    var service = {

      base: 'http://gdriv.es/aslanelectric/',
      prefix: 'img_',
      suffix: '.jpg',
      slides: [],
      images: [
        {
          text: 'Commercial Lighting',
          id  : '6571',
          type: 'slide'
        },
        {
          text: 'Home Automation',
          id  : '6682',
          type: 'slide'
        },
        {
          text: 'Design Engineering',
          id  : '6683',
          type: 'slide'
        },
        {
          text: 'Network Design',
          id  : '6695',
          type: 'slide'
        },
        {
          text: 'Municipal Services',
          id  : '7152',
          type: 'slide'
        },
        {
          text: 'Retrofit Upgrades',
          id  : '7211',
          type: 'slide'
        }
      ]

    };

    angular.forEach(service.images, function (value) {
      value.url = service.base + service.prefix + value.id + service.suffix;
      if (value.type === 'slide') {
        service.slides.push(value);
      }

    });



    return service;

  });


}(angular.module('aslan.image', [])));