describe('slides Service', function () {
  'use strict';


  var slideService;
  var base, prefix, suffix;

  function checkSlideUrl(url, slide) {

    expect(url.slice(0, base.length)).toEqual(base);
    expect(url.slice(base.length, base.length + prefix.length)).toEqual(prefix);
    expect(url.slice(base.length + prefix.length, base.length + prefix.length + slide.ids[0].length)).toEqual(slide.ids[0]);
    expect(url.slice(-suffix.length)).toEqual(suffix);

  }

  beforeEach(module('aslan.slides'));

  describe('initial values', function () {

    beforeEach(inject(function (_slideService_) {
      base = '/assets/images/';
      prefix = 'IMG_';
      suffix = '.JPG';
      slideService = new _slideService_(base, prefix, suffix);
    }));

    it('should load the slides', inject(function () {

      expect(slideService.slides).not.toBeUndefined();

      expect(slideService.slides).toEqual(jasmine.any(Array));

      angular.forEach(slideService.slides, function (slide) {

        expect(slide).toEqual(jasmine.any(Object));
        expect(slide.text).toEqual(jasmine.any(String));
        expect(slide.href).toEqual(jasmine.any(String));
        expect(slide.href.indexOf('#')).toEqual(0);
        expect(slide.ids).toEqual(jasmine.any(Array));

        angular.forEach(slide.ids, function (id) {
          expect(id).toEqual(jasmine.any(String));
        });

      });

    }));


    it('should initialize the slides to default values', function () {

      angular.forEach(slideService.slides, function (slide) {

        var url = slide.url();
        expect(slide.selected).toEqual(0);
        checkSlideUrl(url, slide);

      });
    });

    it('should select the next slide', function () {

      angular.forEach(slideService.slides, function (slide, index) {

        expect(slide.selected).toEqual(0);

        if (slide.ids.length > 1) {
          angular.forEach(slide.ids, function (value, key) {
            slide.selectNext();
            expect(slide.selected).toEqual((key + 1) % slide.ids.length);
          });

        } else {
          slide.selectNext();
          expect(slide.selected).toEqual(0);
        }

      });

    });


  });

  describe('New values', function () {

    beforeEach(inject(function (_slideService_) {
      base = 'http://gdriv.es/aslanelectric';
      prefix = 'image_';
      suffix = '.gif';
      slideService = new _slideService_(base, prefix, suffix);
    }));

    it('should be able to be reinitialized to new values', function () {

      angular.forEach(slideService.slides, function (slide) {
        var url = slide.url();
        expect(slide.selected).toEqual(0);
        checkSlideUrl(url, slide);
      });

    });
  });


});

