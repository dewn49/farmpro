'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Crop = mongoose.model('Crop'),
  Farm = mongoose.model('Farm'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a crop
 */
exports.create = function(req, res) {
  var crop = new Crop(req.body);

  // select farm by user
  var searchQuery = {
    $or: [{'user' : req.user}]
  };
  Farm.findOne(searchQuery).exec(function(err, farm) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      if (!farm) {
        console.log("#### Vo ly qua, sao lai ko co farm");
      }
      else {
        crop.farm = farm;

        console.log("Farm ID: " + crop.farm._id);

        crop.save(function(err) {
          if (err) {
            return res.status(400).send({
              message: errorHandler.getErrorMessage(err)
            });
          } else {
            res.jsonp(crop);
          }
        });        
      }
    } 
  });
};

/**
 * Show the current crop
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var crop = req.crop ? req.crop.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  crop.isCurrentUserOwner = req.user && crop.user && crop.user._id.toString() === req.user._id.toString() ? true : false;

  res.jsonp(crop);
};

/**
 * Update a crop
 */
exports.update = function(req, res) {
  var crop = req.crop ;

  crop = _.extend(crop , req.body);

  crop.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(crop);
    }
  });
};

/**
 * Delete an crop
 */
exports.delete = function(req, res) {
  var crop = req.crop ;

  crop.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(crop);
    }
  });
};

/**
 * List of crops
 */
exports.list = function(req, res) {
  // select farm by user
  var searchQuery = {
    $or: [{'user' : req.user}]
  };
  Farm.findOne(searchQuery).exec(function(err, farm) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      if (!farm) {
        console.log("#### Vo ly qua, sao lai ko co farm");
      }
      else {
        // select crop by farm
        var searchCrop = {
          $or: [{'farm' : farm}]
        };

        Crop.find(searchCrop).exec(function(err, crops) {
          if (err) {
            return res.status(400).send({
              message: errorHandler.getErrorMessage(err)
            });
          } else {
            res.jsonp(crops);
          }
        });           
      }
    } 
  });
};

/**
 * Crop middleware
 */
exports.cropByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Crop is invalid'
    });
  }

  Crop.findById(id).populate('user', 'displayName').exec(function (err, crop) {
    if (err) {
      return next(err);
    } else if (!crop) {
      return res.status(404).send({
        message: 'No Crop with that identifier has been found'
      });
    }
    req.crop = crop;
    next();
  });
};
