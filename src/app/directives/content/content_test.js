ddescribe('content directive', function () {

  'use strict';

  var content;

  beforeEach(module('aslan.content'));

  beforeEach(inject(function ($compile, $rootScope) {

    var scope = $rootScope.$new();
    var element = '<content></content>';

    content = $compile(element)(scope);

  }));

  it('should compile the element', function () {

    expect(content).not.toBeUndefined();

  });


});