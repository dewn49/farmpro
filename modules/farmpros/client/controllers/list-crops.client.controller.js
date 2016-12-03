(function () {
  'use strict';

  angular
    .module('farmpros')
    .controller('CropsListController', CropsListController);

  CropsListController.$inject = ['CropsService'];

  function CropsListController(CropsService) {
    var vm = this;
    vm.crops = CropsService.query();
  }
}());
