(function () {
  'use strict';

  // Farmpros controller
  angular
    .module('farmpros')
    .controller('CropController', CropController);

  CropController.$inject = ['$scope', '$state', '$window', 'Authentication', 'farmproResolve'];

  function CropController ($scope, $state, $window, Authentication, farmpro) {
    var vm = this;

    vm.authentication = Authentication;
    vm.farmpro = farmpro;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Farmpro
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.farmpro.$remove($state.go('farmpros.list'));
      }
    }

    // Save Farmpro
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.farmproForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.farmpro._id) {
        vm.farmpro.$update(successCallback, errorCallback);
      } else {
        vm.farmpro.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('farmpros.view', {
          farmproId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
