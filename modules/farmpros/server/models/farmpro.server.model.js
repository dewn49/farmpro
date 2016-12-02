'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Farmpro Schema
 */
var FarmSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Farmpro name',
    trim: true
  },
  address: {
    type: String,
    default: '',
    trim: true
  },
  area: {
    type: String,
    default: '0.0 ha',
    trim: true
  },
  note: {
    type: String,
    default: '',
    trim: true
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Farm', FarmSchema);
