describe('navbar test', function () {

  var rootScope, scope;

  var breakpoint = 50;
  var scrollOffset = 0;

  beforeEach(module('aslan.navbar'));

  beforeEach(inject(function($rootScope, $controller) {

    rootScope = $rootScope;
    scope = $rootScope.$new();
    $controller('NavCtrl', {$scope: scope});


  }));



  it('should set the starting values', inject(function() {


    expect(scope.nav.isCollapsed).toBe(true);
    expect(scope.nav.darken).toBe(false);
    expect(scope.dropDown.isOpen).toBe(false);

  }));

  it('should not darken before scrolling past breakpoint', inject(function() {

    rootScope.$broadcast('scroll', breakpoint);
    rootScope.$apply();

    expect(scope.nav.darken).toBe(false);

  }));

  it('should darken when scrolled past breakpoint', inject(function() {

    rootScope.$broadcast('scroll', breakpoint+1);
    rootScope.$apply();

    expect(scope.nav.darken).toBe(true);

  }));

  it('should collapse nav bar', inject(function() {

    expect(scope.nav.isCollapsed).toBe(true);
    scope.navToggle();
    expect(scope.nav.isCollapsed).toBe(false);
    scope.navToggle();
    expect(scope.nav.isCollapsed).toBe(true);


  }));

  it('should re-collapse navbar and close dropdown on click', inject(function() {

    var event = jasmine.createSpyObj('event', [
      'preventDefault',
      'stopPropagation'
    ]);

    scope.nav.isCollapsed = false;
    scope.dropDown.isOpen = true;

    scope.navClick(event);

    expect(event.preventDefault).toHaveBeenCalled();
    expect(event.stopPropagation).toHaveBeenCalled();

    expect(scope.nav.isCollapsed).toBe(true);
    expect(scope.dropDown.isOpen).toBe(false);

  }));




});