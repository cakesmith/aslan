describe('preloader', function () {

  'use strict';

  var element, scope, slideService;

  beforeEach(module('aslan.preloader'));

  beforeEach(module(function ($provide) {

    function urlFn(index) {
      return 'http://' + index + '/' + this.ids[index];
    }


    slideService = {
      slides: [
        {
          url: urlFn,
          ids: ['1234']
        },
        {
          url: urlFn,
          ids: ['5678', '0123']
        }

      ]};

    $provide.value('slideService', slideService);


  }));


  beforeEach(inject(function ($rootScope, $compile) {

    var tpl = '<preloader></preloader>';

    scope = $rootScope.$new();

    element = $compile(tpl)(scope);

    scope.$digest();

  }));


  it('should compile an element', function () {

    expect(element).not.toBeUndefined();

  });

  it('should set the scope to the slide array', function () {

    expect(scope.slides.length).toBe(2);
    expect(scope.slides).toEqual(slideService.slides);


  });


  it('should make an img for each slide', function () {

    var imgs = element.find('img');

    expect(imgs.length).toEqual(3);

    expect(imgs.eq(0).prop('src')).toEqual('http://0/1234');
    expect(imgs.eq(1).prop('src')).toEqual('http://0/5678');
    expect(imgs.eq(2).prop('src')).toEqual('http://1/0123');


  });


});