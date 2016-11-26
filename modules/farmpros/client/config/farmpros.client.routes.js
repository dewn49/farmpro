(function () {
  'use strict';

  angular
    .module('farmpros')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('farmpros', {
        abstract: true,
        url: '/farmpros',
        template: '<ui-view/>'
      })
      .state('farmpros.list', {
        url: '',
        templateUrl: 'modules/farmpros/client/views/list-farmpros.client.view.html',
        controller: 'FarmprosListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Farmpros List'
        }
      })
      .state('farmpros.create', {
        url: '/create',
        templateUrl: 'modules/farmpros/client/views/form-farmpro.client.view.html',
        controller: 'FarmprosController',
        controllerAs: 'vm',
        resolve: {
          farmproResolve: newFarmpro
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Farmpros Create'
        }
      })
      .state('farmpros.edit', {
        url: '/:farmproId/edit',
        templateUrl: 'modules/farmpros/client/views/form-farmpro.client.view.html',
        controller: 'FarmprosController',
        controllerAs: 'vm',
        resolve: {
          farmproResolve: getFarmpro
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Farmpro {{ farmproResolve.name }}'
        }
      })
      .state('farmpros.view', {
        url: '/:farmproId',
        templateUrl: 'modules/farmpros/client/views/view-farmpro.client.view.html',
        controller: 'FarmprosController',
        controllerAs: 'vm',
        resolve: {
          farmproResolve: getFarmpro
        },
        data: {
          pageTitle: 'Farmpro {{ farmproResolve.name }}'
        }
      });
  }

  getFarmpro.$inject = ['$stateParams', 'FarmprosService'];

  function getFarmpro($stateParams, FarmprosService) {
    return FarmprosService.get({
      farmproId: $stateParams.farmproId
    }).$promise;
  }

  newFarmpro.$inject = ['FarmprosService'];

  function newFarmpro(FarmprosService) {
    return new FarmprosService();
  }
}());
