//crops service used to communicate crops REST endpoints
(function () {
  'use strict';

  angular
    .module('farmpros')
    .factory('CropsService', CropsService);

  CropsService.$inject = ['$resource'];

  function CropsService($resource) {
    return $resource('api/crops/:cropId', 
                    {
                      cropId: '@_id'
                    }, 
                    {
                      update: {
                        method: 'PUT'
                      }
                    }
    );
  }
})();
