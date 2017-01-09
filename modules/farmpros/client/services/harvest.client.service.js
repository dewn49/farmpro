//harvests service used to communicate harvests REST endpoints
(function () {
  'use strict';

  angular
    .module('farmpros')
    .factory('HarvestsService', HarvestsService);

  HarvestsService.$inject = ['$resource'];

  function HarvestsService($resource) {
    return $resource('api/harvests/:harvestId', 
                    {
                      harvestId: '@_id'
                    }, 
                    {
                      update: {
                        method: 'PUT'
                      }
                    }
    );
  }
})();
