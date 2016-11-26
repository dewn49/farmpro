'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Farmpro Schema
 */
var FarmproSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Farmpro name',
    trim: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Farmpro', FarmproSchema);
