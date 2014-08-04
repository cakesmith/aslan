describe('E2E: main page', function () {
  'use strict';

  var ptor;

  var dropdownServices = [
    'INDUSTRIAL CONTROLS',
    'COMMERCIAL LIGHTING'
  ];

  beforeEach(function () {
    ptor = protractor.getInstance();
    ptor.ignoreSynchronization = true;
    ptor.get('/');
  });

  it('should load the home page', function () {

    expect(browser.getTitle()).toEqual('Aslan Electric, Inc.');
  });

  it('should darken the navbar when scrolled', function () {

    var navbar = element(by.css('.navbar'));

    expect(navbar.getAttribute('class')).not.toMatch('darken');

    ptor.executeScript('window.scrollTo(0,51);').then(function () {
      expect(navbar.getAttribute('class')).toMatch('darken');
    });

    ptor.executeScript('window.scrollTo(0,0);').then(function () {
      expect(navbar.getAttribute('class')).not.toMatch('darken');
    });

  });

  it('should drop down the menu and have services', function () {

    var dropdown = element(by.css('.dropdown-toggle'));
    dropdown.click();

    var links = element.all(by.repeater('service in services'));

    expect(links.count()).toEqual(dropdownServices.length);

    links.then(function (arr) {
      expect(arr.length).toEqual(dropdownServices.length);
      dropdownServices.forEach(function (element, index) {
        expect(arr[index].getText()).toEqual(element);
      });
    });


  });


});