'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  ProductUnit = mongoose.model('ProductUnit'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Product
 */
exports.create = function(req, res) {
  var productUnit = new ProductUnit(req.body);

  productUnit.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(productUnit);
    }
  });
};

/**
 * List of Products
 */
exports.list = function(req, res) { 
  ProductUnit.find().populate('_id', 'name').exec(function(err, productUnit) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(productUnit);
    }
  });
};