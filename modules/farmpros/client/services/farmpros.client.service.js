// Farmpros service used to communicate Farmpros REST endpoints
(function () {
  'use strict';

  angular
    .module('farmpros')
    .factory('FarmprosService', FarmprosService);

  FarmprosService.$inject = ['$resource'];

  function FarmprosService($resource) {
    return $resource('api/farmpros/:farmproId', {
      farmproId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
