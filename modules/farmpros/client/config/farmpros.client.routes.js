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
      .state('farmpros.setting', {
        url: '',
        templateUrl: 'modules/farmpros/client/views/setting-farmpros.client.view.html',
        controller: 'FarmSettingController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Farm Setting'
        }
      })      
      .state('farmpros.listcrops', {
        url: '',
        templateUrl: 'modules/farmpros/client/views/listcrops-farmpros.client.view.html',
        controller: 'FarmprosListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'List of crops'
        }
      })
      .state('farmpros.createcrop', {
        url: '/create',
        templateUrl: 'modules/farmpros/client/views/form-crop-farmpro.client.view.html',
        controller: 'FarmprosController',
        controllerAs: 'vm',
        resolve: {
          farmproResolve: newFarmpro
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'New Crop'
        }
      })
      .state('farmpros.createharvest', {
        url: '/create',
        templateUrl: 'modules/farmpros/client/views/form-harvest-farmpro.client.view.html',
        controller: 'FarmprosController',
        controllerAs: 'vm',
        resolve: {
          farmproResolve: newFarmpro
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'New Harvest'
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
