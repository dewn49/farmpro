'use strict';

angular.module('farmpros').controller('FarmSettingController', ['$scope', '$state', '$http', '$location', 'FarmprosService', 'Authentication',
  function ($scope, $state, $http, $location, FarmprosService, Authentication) {
    $scope.farmName = "Peace farm";
    $scope.farmAddress = "Hanoi 123";
    $scope.farmArea = "4 ha";
    $scope.farmNote = "Farm for test hehe";

    // Update a user profile
    $scope.updateFarmSetting = function (isValid) {
      $scope.success = $scope.error = null;

      ////sonlt<
      // if (!isValid) {
      //   $scope.$broadcast('show-errors-check-validity', 'userForm');
      //   return false;
      // }
      ////sonlt>

      var farm = new FarmprosService($scope.farm);

      farm.$update(function (response) {
        ////sonlt<
        // $scope.$broadcast('show-errors-reset', 'userForm');
        // $scope.success = true;
        // $scope.message = $scope.message = { type:'success',title:'Success',message:'Profile Updated.' };
        // Authentication.user = response;
        ////sonlt>
        $state.go('farmpros');
        $scope.message = $scope.message = { type:'success',title:'Success',message:'Farm Setting Updated.' };
      }, function (response) {
        $scope.message = $scope.message = { type:'danger',title:'Error',message:response.data.message };
      });
    };
  }
]);
