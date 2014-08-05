describe('slides Service', function () {
  'use strict';

  beforeEach(module('aslan.slides'));
  var slideService;

  beforeEach(inject(function (_slideService_) {

    slideService = _slideService_;

  }));

  it('should load the slides', inject(function () {

    expect(slideService.slides).not.toBeUndefined();


  }));


});

