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

    $scope.DateFormat = "dd-mm-yyyy";
    
    $scope.From = '15/01/2015'; // DD/MM/YYYY
    $scope.To = '31/12/2015'; // DD/MM/YYYY

    vm.jCrop.state = 'Planning';
//    vm.jCrop.startdate = new Date().toJSON().slice(0,10);
//    vm.jCrop.stopdate = new Date().toJSON().slice(0,10);
//    vm.jCrop.harvestdate = new Date().toJSON().slice(0,10);
    vm.jCrop.phanbon = 'No';
    vm.jCrop.thuocdietco = 'No';
    vm.jCrop.thuoctrusau = 'No';
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
      // vm.jCrop.startdate = (vm.jCrop.startdate).toJSON().slice(0,10);
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


  angular.module('farmpros').directive('datetimez', function() {
      return {
          restrict: 'A',
          require : 'ngModel',
          link: function($scope, element, attrs, ngModelCtrl) {
            $(element).datepicker({
              dateFormat:'dd-mm-yy',
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

  angular.module('farmpros').directive('calendar', function () {
      return {
          require: 'ngModel',
          link: function (scope, el, attr, ngModel) {
              $(el).datepicker({
                  dateFormat: 'dd-mm-yy',
                  onSelect: function (dateText) {
                      scope.$apply(function () {
                          ngModel.$setViewValue(dateText);
                      });
                  }
              });
          }
      };
  })

  angular.module('farmpros').directive('datepickerLocaldate', ['$parse', function ($parse) {
      var directive = {
          restrict: 'A',
          require: ['ngModel'],
          link: link
      };
      return directive;

      function link(scope, element, attr, ctrls) {
          var ngModelController = ctrls[1];

          // called with a JavaScript Date object when picked from the datepicker
          ngModelController.$parsers.push(function (viewValue) {
              // undo the timezone adjustment we did during the formatting
              viewValue.setMinutes(viewValue.getMinutes() - viewValue.getTimezoneOffset());
              // we just want a local date in ISO format
              return viewValue.toISOString().substring(0, 10);
          });

          // called with a 'yyyy-mm-dd' string to format
          ngModelController.$formatters.push(function (modelValue) {
              if (!modelValue) {
                  return undefined;
              }
              // date constructor will apply timezone deviations from UTC (i.e. if locale is behind UTC 'dt' will be one day behind)
              var dt = new Date(modelValue);
              // 'undo' the timezone offset again (so we end up on the original date again)
              dt.setMinutes(dt.getMinutes() + dt.getTimezoneOffset());
              return dt;
          });
      }
  }]);

}());

              // //Date picker
              // $('.datepicker').datepicker({
              //   format: 'dd/mm/yyyy',
              //   autoclose: true
              // });
              // //Date picker
              // $('#idStopDate').datepicker({
              //   format: 'dd/mm/yyyy',
              //   autoclose: true
              // });
              // $('#idHarvestDate').datepicker({
              //   format: 'dd/mm/yyyy',
              //   autoclose: true
              // });              


                  // format: {
                  //     /*
                  //     * Say our UI should display a week ahead,
                  //     * but textbox should store the actual date.
                  //     * This is useful if we need UI to select local dates,
                  //     * but store in UTC
                  //     */
                      
                  //     toDisplay: function (date, format, language) {
                  //         var d = new Date(date);
                  //         d.setDate(d.getDate() - 7);
                  //         //d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
                          
                  //         return d.toISOString().substring(0, 10);
                  //     },
                      
                  //     toValue: function (date, format, language) {
                  //         var d = new Date(date);
                  //         d.setDate(d.getDate() + 7);
                  //         //d.setMinutes( d.getMinutes() + d.getTimezoneOffset() );
                  //         console.log('sonlt' + d);
                  //         return new Date(d);
                  //     }
                  // },