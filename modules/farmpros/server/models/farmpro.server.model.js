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
  owner: {
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
    type: Number,
    default: '0.000'
  },
  note: {
    type: String,
    default: '',
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

mongoose.model('Farm', FarmSchema);
