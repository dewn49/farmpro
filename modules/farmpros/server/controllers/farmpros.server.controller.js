'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Farmpro = mongoose.model('Farmpro'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Farmpro
 */
exports.create = function(req, res) {
  var farmpro = new Farmpro(req.body);
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
 * Show the current Farmpro
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
 * Update a Farmpro
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
 * Delete an Farmpro
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
 * List of Farmpros
 */
exports.list = function(req, res) {
  Farmpro.find().sort('-created').populate('user', 'displayName').exec(function(err, farmpros) {
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
 * Farmpro middleware
 */
exports.farmproByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Farmpro is invalid'
    });
  }

  Farmpro.findById(id).populate('user', 'displayName').exec(function (err, farmpro) {
    if (err) {
      return next(err);
    } else if (!farmpro) {
      return res.status(404).send({
        message: 'No Farmpro with that identifier has been found'
      });
    }
    req.farmpro = farmpro;
    next();
  });
};
