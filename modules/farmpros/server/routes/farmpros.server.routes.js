'use strict';

/**
 * Module dependencies
 */
var farmprosPolicy = require('../policies/farmpros.server.policy'),
  farmpros = require('../controllers/farmpros.server.controller');

module.exports = function(app) {
  // Farmpros Routes
  app.route('/api/farmpros').all(farmprosPolicy.isAllowed)
    .get(farmpros.list)
    .post(farmpros.create);

  app.route('/api/farmpros/:farmproId').all(farmprosPolicy.isAllowed)
    .get(farmpros.read)
    .put(farmpros.update)
    .delete(farmpros.delete);

  // Finish by binding the Farmpro middleware
  app.param('farmproId', farmpros.farmproByID);
};
