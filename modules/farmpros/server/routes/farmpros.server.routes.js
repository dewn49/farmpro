'use strict';

/**
 * Module dependencies
 */
var farmprosPolicy = require('../policies/farmpros.server.policy'),
  farmpros = require('../controllers/farmpros.server.controller'),
  crop = require('../controllers/crop.server.controller'),
  harvest = require('../controllers/harvest.server.controller');

module.exports = function(app) {
  // Farmpros Routes
  app.route('/api/farminfo').all(farmprosPolicy.isAllowed)
    .put(farmpros.updateSetting);

  app.route('/info').all(farmprosPolicy.isAllowed)
    .get(farmpros.getSetting)

  // app.route('/api/farmpros/:farmproId').all(farmprosPolicy.isAllowed)
  //   .get(farmpros.read)
  //   .put(farmpros.update)
  //   .delete(farmpros.delete);

  // // Finish by binding the Farmpro middleware
  // app.param('farmproId', farmpros.farmproByID);

  // Crop Routes
  app.route('/api/crops').all(farmprosPolicy.isAllowed)
    .get(crop.list)
    .post(crop.create);

  app.route('/api/crops/:cropId').all(farmprosPolicy.isAllowed)
    .get(crop.read)
    .put(crop.update)
    .delete(crop.delete);

  // Harvest Routes
  app.route('/api/harvests').all(farmprosPolicy.isAllowed)
    .get(harvest.list)
    .post(harvest.create);

  app.route('/api/harvests/:harvestId').all(farmprosPolicy.isAllowed)
    .get(harvest.read)
    .put(harvest.update)
    .delete(harvest.delete);

  // binding the Crop middleware
  app.param('cropId', crop.cropByID);

  // binding the harvest middleware
  app.param('harvestId', harvest.harvestByID);


};
