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
      //############################################################################
      .state('crops', {
        abstract: true,
        url: '/crops',
        template: '<ui-view/>'
      })      
      .state('crops.list', { 
        url: '/listCrop',
        templateUrl: 'modules/farmpros/client/views/listcrops-farmpros.client.view.html',
        controller: 'CropsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'List of crops'
        }
      })
      .state('crops.create', {
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
      .state('crops.edit', {
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
      .state('crops.view', {
        url: '/:cropId',
        templateUrl: 'modules/farmpros/client/views/view-farmpro.client.view.html',
        controller: 'CropController',
        controllerAs: 'vm',
        resolve: {
          cropResolve: getCrop
        },
        data: {
          pageTitle: 'Farmpro {{ cropResolve.name }}'
        }
      })
      //#########################################################################
      // Harvest route 
      //
      .state('harvests', {
        abstract: true,
        url: '/harvests',
        template: '<ui-view/>'
      })
      .state('harvests.list', {
        url: '/list/:cropId/',
        templateUrl: 'modules/farmpros/client/views/listharvest-farmpros.client.view.html',
        controller: 'HarvestsListController as vm',
        resolve: {
          harvestResolve: getHarvestOfCrop
        },
        data: {
          pageTitle: 'List of harvest'
        }
      })
      .state('harvests.create', {
        url: '/create',
        templateUrl: 'modules/farmpros/client/views/form-harvest-farmpro.client.view.html',
        controller: 'HarvestController',
        controllerAs: 'vm',
        resolve: {
          harvestResolve: newHarvest
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'New Harvest'
        }
      })
      .state('harvests.edit', {
        url: '/:harvestId/edit',
        templateUrl: 'modules/farmpros/client/views/form-harvest-farmpro.client.view.html',
        controller: 'HarvestController',
        controllerAs: 'vm',
        resolve: {
          harvestResolve: getHarvest
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Harvest'
        }
      })
      //#########################################################################
      // Harvest route 
      //
      .state('stores', {
        abstract: true,
        url: '/stores',
        template: '<ui-view/>'
      })
      .state('stores.list', {
        url: '/',
        templateUrl: 'modules/farmpros/client/views/stores-farmpros.client.view.html',
        controller: 'StoresController as vm',
        data: {
          pageTitle: 'The store of products'
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

  getHarvest.$inject = ['$stateParams', 'HarvestsService'];

  function getHarvest($stateParams, HarvestsService) {
    return HarvestsService.get({
      harvestId: $stateParams.harvestId
    }).$promise;
  }

  newHarvest.$inject = ['HarvestsService'];

  function newHarvest(HarvestsService) {
    return new HarvestsService();
  } 

  getHarvestOfCrop.$inject = ['$stateParams', 'HarvestListService'];
  function getHarvestOfCrop($stateParams, HarvestListService) {
    return HarvestListService.selectFromCrop({
      cropId: $stateParams.cropId
    }).$promise;
  }
  
}());
