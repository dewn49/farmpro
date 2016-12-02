(function () {
  'use strict';

  angular
    .module('farmpros')
    .controller('FarmprosListController', FarmprosListController);

  FarmprosListController.$inject = ['FarmprosService'];

  function FarmprosListController(FarmprosService) {
    var vm = this;

    // vm.farmpros = FarmprosService.query();
  }
}());
