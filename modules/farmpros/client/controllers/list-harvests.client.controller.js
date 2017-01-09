(function () {
  'use strict';

  angular
    .module('farmpros')
    .controller('HarvestsListController', HarvestsListController);

  HarvestsListController.$inject = ['HarvestsService'];

  function HarvestsListController(HarvestsService) {
    var vm = this;
    vm.harvests = HarvestsService.query();
  }
}());
