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
        url: '/info',
        templateUrl: 'modules/farmpros/client/views/setting-farmpros.client.view.html',
        // controller: 'FarmSettingController',
        // controllerAs: 'vm',
        data: {
          pageTitle: 'Farm Setting'
        }
      })      
      .state('farmpros.listcrops', {
        url: '/crops',
        templateUrl: 'modules/farmpros/client/views/listcrops-farmpros.client.view.html',
        controller: 'CropsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'List of crops'
        }
      })
      .state('farmpros.createcrop', {
        url: '/createCrop',
        templateUrl: 'modules/farmpros/client/views/form-crop-farmpro.client.view.html',
        controller: 'CropController',
        controllerAs: 'vm',
        resolve: {
          cropResolve: newCrop
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'New Crop'
        }
      })
      .state('farmpros.listharvest', {
        url: '/harvests',
        templateUrl: 'modules/farmpros/client/views/listharvest-farmpros.client.view.html',
        controller: 'HarvestsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'List of harvest'
        }
      })
      .state('farmpros.createharvest', {
        url: '/create',
        templateUrl: 'modules/farmpros/client/views/form-harvest-farmpro.client.view.html',
        controller: 'CropController',
        controllerAs: 'vm',
        resolve: {
          cropResolve: newHarvest
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'New Harvest'
        }
      })
      .state('farmpros.edit', {
        url: '/:cropId/edit',
        templateUrl: 'modules/farmpros/client/views/form-crop-farmpro.client.view.html',
        controller: 'CropController',
        controllerAs: 'vm',
        resolve: {
          cropResolve: getCrop
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Farmpro {{ cropResolve.name }}'
        }
      })
      .state('farmpros.view', {
        url: '/:farmproId',
        templateUrl: 'modules/farmpros/client/views/view-farmpro.client.view.html',
        controller: 'CropController',
        controllerAs: 'vm',
        resolve: {
          cropResolve: getCrop
        },
        data: {
          pageTitle: 'Farmpro {{ cropResolve.name }}'
        }
      });
  }

  getCrop.$inject = ['$stateParams', 'CropsService'];

  function getCrop($stateParams, CropsService) {
    return CropsService.get({
      cropId: $stateParams.cropId
    }).$promise;
  }

  newCrop.$inject = ['CropsService'];

  function newCrop(CropsService) {
    return new CropsService();
  }

  function newHarvest(CropsService) {
    return new CropsService();
  }  
}());
