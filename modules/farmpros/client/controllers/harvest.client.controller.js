(function () {
  'use strict';

  angular.module('farmpros').controller('HarvestController', HarvestController);

  HarvestController.$inject = ['$scope', '$state', '$window', '$document','Authentication', 'harvestResolve', 'CropsService'];

  function HarvestController ($scope, $state, $window, $document, Authentication, harvest, iCropsService) {
    var vm = this;

    vm.jHarvest = harvest;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    vm.jCrops = iCropsService.query();

    $scope.DateFormat = "dd-mm-yyyy";    
    // vm.jCrop.state = 'Planning'; // TODO
    vm.success = false;
    vm.error = false;


    // Remove existing Farmpro
    function remove() {

    }

    // Save Farmpro
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.harvestForm');
        return false;
      }
      // TODO: move create/update logic to service
      if (vm.jHarvest._id) {
        vm.jHarvest.$update(successCallback, errorCallback);
      } else {
        vm.jHarvest.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        vm.success = true;
        $state.go('harvests.edit', {
          harvestId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = true;
        vm.error = res.data.message;
      }
    }
  }

}());
  