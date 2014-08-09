describe('content directive', function () {

  'use strict';

  var content, httpBackend;

  beforeEach(module('aslan.content'));


  beforeEach(inject(function ($compile, $rootScope, $httpBackend) {

    var scope = $rootScope.$new();
    var element = '<content></content>';

    httpBackend = $httpBackend;

    httpBackend.when('GET', '/aslan/templates/content/header.html')
      .respond(200, '<div>Here is some header content!</div>');

    httpBackend.when('GET', '/aslan/templates/content/about.html')
      .respond(200, '<div>Here is the about content!</div>');

    httpBackend.when('GET', '/aslan/templates/content/commercial.html')
      .respond(200, '<div>Here is the commercial content!</div>');

    httpBackend.when('GET', '/aslan/templates/content/firealarm.html')
      .respond(200, '<div>Here is the firealarm content!</div>');

    httpBackend.when('GET', '/aslan/templates/content/contact.html')
      .respond(200, '<div>Here is the contact content!</div>');

    content = $compile(element)(scope);


    scope.$digest();

  }));

  afterEach(function () {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  it('should compile the element', function () {

    httpBackend.flush();
    expect(content).not.toBeUndefined();

  });

  it('should create a div for each template', function () {
    httpBackend.flush();
    var divs = content.find('div');

    expect(divs.eq(1).hasClass('header')).toBe(true);
    expect(divs.eq(2).text()).toEqual('Here is some header content!');
    expect(divs.eq(3).hasClass('commercial')).toBe(true);
    expect(divs.eq(4).text()).toEqual('Here is the commercial content!');


  });


});