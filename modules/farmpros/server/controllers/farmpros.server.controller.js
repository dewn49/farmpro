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
  console.log("#### Get setting ===>");
  var searchQuery = {
    $or: [{'user' : req.user}]
  };
  Farm.findOne(searchQuery).exec(function(err, farm) {
    if (err) {
      console.log("#### DB error");
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      if (!farm) {
        console.log("#### Not found");
        return res.jsonp(new Farm());
      }
      else {
        console.log("#### Success");
        res.jsonp(farm);
      }

    }
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

  // var keyName1=req.body;
  // console.log("#### Req body");
  // console.log(keyName1);

  // keyName1.name = "Hacker Farm";
  // res.jsonp(keyName1);

  // process.stdout.write("\n#### updateSetting\n");

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
        farm = new Farm(req.body);
        farm.user = req.user;
        console.log("#### New Farm info: " + farm.name + "  Owner: " + farm.user.username);
      }
      else {
        farm.name = req.body.name;
        farm.address = req.body.address;
        farm.area = req.body.area;
        farm.note = req.body.note;
        console.log("#### Update Farm info");
      }

      farm.save(function(err) {
        if (err) {
          return res.status(400).send({
            message: errorHandler.getErrorMessage(err)
          });
        } else {
          res.status(200).send();
        }
      });
    } 
  });
  
  // farm = _.extend(farm, req.body);
  // console.log("#### Farm info: " + farm.name);
  // farm.name = "Hacker Farm";
 
};