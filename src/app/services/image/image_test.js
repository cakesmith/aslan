beforeEach(module('aslan.image'));
'use strict';

describe('image Service', function () {

  var imageService;

  beforeEach(inject(function (_imageService_) {

    imageService = _imageService_;

  }));

  it('should load the images', inject(function () {

    expect(imageService.images).not.toBeUndefined();
    expect(imageService.slides).not.toBeUndefined();

  }));


});

