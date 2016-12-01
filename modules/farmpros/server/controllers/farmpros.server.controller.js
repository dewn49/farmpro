'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Farm = mongoose.model('Farm'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Farm
 */
exports.create = function(req, res) {
  var farmpro = new Farm(req.body);
  farmpro.user = req.user;

  farmpro.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(farmpro);
    }
  });
};

/**
 * Show the current Farm
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var farmpro = req.farmpro ? req.farmpro.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  farmpro.isCurrentUserOwner = req.user && farmpro.user && farmpro.user._id.toString() === req.user._id.toString();

  res.jsonp(farmpro);
};

/**
 * Update a Farm
 */
exports.update = function(req, res) {
  var farmpro = req.farmpro;

  farmpro = _.extend(farmpro, req.body);

  farmpro.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(farmpro);
    }
  });
};

/**
 * Delete an Farm
 */
exports.delete = function(req, res) {
  var farmpro = req.farmpro;

  farmpro.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(farmpro);
    }
  });
};

/**
 * List of Farms
 */
exports.list = function(req, res) {
  Farm.find().sort('-created').populate('user', 'displayName').exec(function(err, farmpros) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(farmpros);
    }
  });
};

/**
 * Farm middleware
 */
exports.farmproByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Farm is invalid'
    });
  }

  Farm.findById(id).populate('user', 'displayName').exec(function (err, farmpro) {
    if (err) {
      return next(err);
    } else if (!farmpro) {
      return res.status(404).send({
        message: 'No Farm with that identifier has been found'
      });
    }
    req.farmpro = farmpro;
    next();
  });
};


/**
 * Get Farm Setting
 */
exports.getSetting = function(req, res) {
  // var farmpro = req.farmpro;

  // farmpro = _.extend(farmpro, req.body);

  // farmpro.save(function(err) {
  //   if (err) {
  //     return res.status(400).send({
  //       message: errorHandler.getErrorMessage(err)
  //     });
  //   } else {
  //     res.jsonp(farmpro);
  //   }
  // });
  return res.status(200).send({
        message: 'Get setting comming soon'
      });
};

/**
 * Update Farm Setting
 */
exports.updateSetting = function(req, res) {
  // var farmpro = req.farmpro;

  // farmpro = _.extend(farmpro, req.body);

  // farmpro.save(function(err) {
  //   if (err) {
  //     return res.status(400).send({
  //       message: errorHandler.getErrorMessage(err)
  //     });
  //   } else {
  //     res.jsonp(farmpro);
  //   }
  // });
  return res.status(200).send({
        message: 'Update setting comming soon'
      });
};