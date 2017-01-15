(function () {
  'use strict';

  angular
    .module('farmpros')
    .controller('CropsListController', CropsListController);

  CropsListController.$inject = ['CropsService', 'HarvestListService', '$q'];

  function CropsListController(CropsService, HarvestListService, $q) {
    var vm = this;
    vm.crops = CropsService.query();
    vm.arrYielPlan = [];
    vm.arrYielActual = [];
    var i=0;

    // $q.all(vm.crops).then((crs) => {
    //     console.log(crs[0]); // value alpha
    //     console.log(crs[1]); // value betaa
    //     complete();
    // });

    vm.crs = [];
    vm.crops.$promise.then(function(crops) {
      console.log('q.all done, return size: ' + crops.length);
      vm.crs = crops;

      for (var j in vm.crs) {
          if (j < vm.crs.length) {
            var crop = vm.crs[j];
            vm.arrYielPlan.push(0); 
            vm.arrYielActual.push(0);
            // console.log('Crop #' + j + ' id = ' + crop._id);
            getYielOfCrop(crop._id, vm.arrYielPlan.length-1);  
          }
      }    

    });

    function getYielOfCrop(iCropId, index) {
      var harvests = [];            
      HarvestListService.selectFromCrop({cropId: iCropId}).$promise.then(function(hvs) {
        harvests = hvs;
        // console.log(harvests);
        for (var k in harvests) {
          if (k < harvests.length) {
            vm.arrYielPlan[index] += parseInt(harvests[k].planyield, 10);
            vm.arrYielActual[index] += parseInt(harvests[k].harvestyield, 10);
          }
        }
      });
    }

  }
}());
