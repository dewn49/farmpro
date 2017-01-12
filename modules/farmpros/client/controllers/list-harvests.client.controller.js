(function () {
  'use strict';

  angular
    .module('farmpros')
    .controller('HarvestsListController', HarvestsListController);

  HarvestsListController.$inject = ['harvestResolve'];

  function HarvestsListController(harvestResolve) {
    var vm = this;
    vm.harvests = harvestResolve;
  }
}());
