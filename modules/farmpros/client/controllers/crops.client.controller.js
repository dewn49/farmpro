(function () {
  'use strict';

  // Farmpros controller
  angular
    .module('farmpros')
    .controller('CropController', CropController);

  CropController.$inject = ['$scope', '$state', '$window', '$document','Authentication', 'cropResolve', 'ProductsService'];

  function CropController ($scope, $state, $window, $document, Authentication, crop, iProductsService) {
    var vm = this;

    vm.authentication = Authentication;
    vm.jCrop = crop;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    vm.jProducts = iProductsService.query();

//     vm.jCrop.state = 'Planning';
//    vm.jCrop.startdate = new Date().toJSON().slice(0,10);
//    vm.jCrop.stopdate = new Date().toJSON().slice(0,10);
//    vm.jCrop.harvestdate = new Date().toJSON().slice(0,10);
//     vm.jCrop.phanbon = 'No';
//     vm.jCrop.thuocdietco = 'No';
//     vm.jCrop.thuoctrusau = 'No';
    vm.success = false;
    vm.error = false;

    // $scope.var1 = '12-07-2013';

    // Remove existing Farmpro
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.jCrop.$remove($state.go('farmpros.list'));
      }
    }

    // Save Farmpro
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.cropForm');
        return false;
      }
      vm.jCrop.startdate = new Date(vm.jCrop.startdate.toLocaleDateString());
      // vm.jCrop.stopdate = vm.jCrop.stopdate.toLocaleDateString();
      // TODO: move create/update logic to service
      if (vm.jCrop._id) {
        vm.jCrop.$update(successCallback, errorCallback);
      } else {
        vm.jCrop.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        vm.success = true;
        $state.go('farmpros.edit', {
          cropId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = true;
        vm.error = res.data.message;
      }
    }
  }


  angular
    .module('farmpros').directive('datetimez', function() {
      return {
          restrict: 'A',
          require : 'ngModel',
          link: function($scope, element, attrs, ngModelCtrl) {
            $(element).datepicker({
              dateFormat:'dd-MM-yyyy',
            language: 'en',
            pickTime: false,
            startDate: '01-11-2013',      // set a minimum date
            endDate: '01-11-2030'          // set a maximum date
            }).on('changeDate', function(e) {
              ngModelCtrl.$setViewValue(e.date);
              $scope.$apply();
            });
          }
      };
  });

}());
