'use strict';

/**
 * Module dependencies
 */
var farmprosPolicy = require('../policies/farmpros.server.policy'),
  farmpros = require('../controllers/farmpros.server.controller');

module.exports = function(app) {
  // Farmpros Routes
  app.route('/api/farminfo').all(farmprosPolicy.isAllowed)
    .get(farmpros.getSetting)
    .put(farmpros.updateSetting);

  app.route('/api/farmpros/:farmproId').all(farmprosPolicy.isAllowed)
    .get(farmpros.read)
    .put(farmpros.update)
    .delete(farmpros.delete);

  // Finish by binding the Farmpro middleware
  app.param('farmproId', farmpros.farmproByID);
};
