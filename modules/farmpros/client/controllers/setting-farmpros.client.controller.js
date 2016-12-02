'use strict';

angular.module('farmpros').controller('FarmSettingController', ['$scope', '$state', '$http', '$location', 'FarmprosService', 'Authentication',
  function ($scope, $state, $http, $location, FarmprosService, Authentication) {
    // $scope.farmName = "Peace farm";
    // $scope.farmAddress = "Hanoi 123";
    // $scope.farmArea = "4 ha";
    // $scope.farmNote = "Farm for test hehe";

    // $scope.farm = FarmprosService.get();//{"name" : "", "address" : "", "area" : "", "note" : ""};

    $http({method: 'GET', url: '/info'}).
      success(function(data, status, headers, config) {
        // this callback will be called asynchronously
        // when the response is available
        $scope.farm = data;
      }).
      error(function(data, status, headers, config) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });

    // Update a user profile
    $scope.updateFarmSetting = function (isValid) {
      $scope.success = $scope.error = null;

      ////sonlt<
      // if (!isValid) {
      //   $scope.$broadcast('show-errors-check-validity', 'userForm');
      //   return false;
      // }
      ////sonlt>

      var farmSc = new FarmprosService($scope.farm);

      farmSc.$update(function (response) {
        ////sonlt<
        // $scope.$broadcast('show-errors-reset', 'userForm');
        // $scope.success = true;
        // $scope.message = $scope.message = { type:'success',title:'Success',message:'Profile Updated.' };
        // Authentication.user = response;
        ////sonlt>
        //$scope.farm = response;
        $scope.success = true;
        //$scope.message = $scope.message = { type:'success',title:'Success',message:'Farm Setting Updated.' };
      }, function (response) {
        $scope.error = true;
        //$scope.message = $scope.message = { type:'danger',title:'Error',message:response.data.message };
      });
    };
  }
]);
