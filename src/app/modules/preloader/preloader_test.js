describe('preloader', function () {

  'use strict';

  var element, scope, imageSvc;

  beforeEach(module('aslan.preloader'));

  beforeEach(module(function ($provide) {

    imageSvc = {
      slides: [

        {
          ids: ['1234']
        },
        {
          ids: ['5678', '0123']
        }

      ]
    };

    var defaults = {
      base  : 'http://',
      prefix: 'prefix.',
      suffix: '.jpg'
    };

    $provide.value('images', imageSvc);
    $provide.value('slideDefaults', defaults);


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

    expect(scope.urls.length).toBe(3);
    expect(scope.urls[0]).toEqual('http://prefix.1234.jpg');
    expect(scope.urls[1]).toEqual('http://prefix.5678.jpg');
    expect(scope.urls[2]).toEqual('http://prefix.0123.jpg');

  });


  it('should make an img for each slide', function () {

    var imgs = element.find('img');

    expect(imgs.length).toEqual(3);

    expect(imgs.eq(0).prop('src')).toEqual('http://prefix.1234.jpg/');
    expect(imgs.eq(1).prop('src')).toEqual('http://prefix.5678.jpg/');
    expect(imgs.eq(2).prop('src')).toEqual('http://prefix.0123.jpg/');


  });


});