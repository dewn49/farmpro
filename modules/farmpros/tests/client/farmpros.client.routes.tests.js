(function () {
  'use strict';

  describe('Farmpros Route Tests', function () {
    // Initialize global variables
    var $scope,
      FarmprosService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _FarmprosService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      FarmprosService = _FarmprosService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('farmpros');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/farmpros');
        });

        it('Should be abstract', function () {
          expect(mainstate.abstract).toBe(true);
        });

        it('Should have template', function () {
          expect(mainstate.template).toBe('<ui-view/>');
        });
      });

      describe('View Route', function () {
        var viewstate,
          FarmprosController,
          mockFarmpro;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('farmpros.view');
          $templateCache.put('modules/farmpros/client/views/view-farmpro.client.view.html', '');

          // create mock Farmpro
          mockFarmpro = new FarmprosService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Farmpro Name'
          });

          // Initialize Controller
          FarmprosController = $controller('FarmprosController as vm', {
            $scope: $scope,
            farmproResolve: mockFarmpro
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:farmproId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.farmproResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            farmproId: 1
          })).toEqual('/farmpros/1');
        }));

        it('should attach an Farmpro to the controller scope', function () {
          expect($scope.vm.farmpro._id).toBe(mockFarmpro._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/farmpros/client/views/view-farmpro.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          FarmprosController,
          mockFarmpro;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('farmpros.create');
          $templateCache.put('modules/farmpros/client/views/form-farmpro.client.view.html', '');

          // create mock Farmpro
          mockFarmpro = new FarmprosService();

          // Initialize Controller
          FarmprosController = $controller('FarmprosController as vm', {
            $scope: $scope,
            farmproResolve: mockFarmpro
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.farmproResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/farmpros/create');
        }));

        it('should attach an Farmpro to the controller scope', function () {
          expect($scope.vm.farmpro._id).toBe(mockFarmpro._id);
          expect($scope.vm.farmpro._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/farmpros/client/views/form-farmpro.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          FarmprosController,
          mockFarmpro;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('farmpros.edit');
          $templateCache.put('modules/farmpros/client/views/form-farmpro.client.view.html', '');

          // create mock Farmpro
          mockFarmpro = new FarmprosService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Farmpro Name'
          });

          // Initialize Controller
          FarmprosController = $controller('FarmprosController as vm', {
            $scope: $scope,
            farmproResolve: mockFarmpro
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:farmproId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.farmproResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            farmproId: 1
          })).toEqual('/farmpros/1/edit');
        }));

        it('should attach an Farmpro to the controller scope', function () {
          expect($scope.vm.farmpro._id).toBe(mockFarmpro._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/farmpros/client/views/form-farmpro.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
