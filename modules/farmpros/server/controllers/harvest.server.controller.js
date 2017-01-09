'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  // Crop = mongoose.model('Crop'),
  Farm = mongoose.model('Farm'),
  Harvest = mongoose.model('Harvest'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a harvest
 */
exports.create = function(req, res) {
  var harvest = new Harvest(req.body);

    harvest.save(function(err) {
        if (err) {
        return res.status(400).send({
            message: errorHandler.getErrorMessage(err)
        });
        } else {
        res.jsonp(harvest);
        }
    });
};

/**
 * Show the current harvest
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var harvest = req.harvest ? req.harvest.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  harvest.isCurrentUserOwner = req.user && harvest.user && harvest.user._id.toString() === req.user._id.toString() ? true : false;

  res.jsonp(harvest);
};

/**
 * Update a harvest
 */
exports.update = function(req, res) {
  var harvest = req.harvest ;

  harvest = _.extend(harvest , req.body);

  harvest.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(harvest);
    }
  });
};

/**
 * Delete an harvest
 */
exports.delete = function(req, res) {

};

/**
 * List of harvests
 */
exports.list = function(req, res) { 
  Harvest.find().exec(function(err, harvests) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(harvests);
    }
  });
};

/**
 * Harvest middleware
 */
exports.harvestByID = function(req, res, next, id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Harvest is invalid'
    });
  }

  Harvest.findById(id).exec(function (err, harvest) {
    if (err) {
      return next(err);
    } else if (!harvest) {
      return res.status(404).send({
        message: 'No harvest with that identifier has been found'
      });
    }
    req.harvest = harvest;
    next();
  });
};
