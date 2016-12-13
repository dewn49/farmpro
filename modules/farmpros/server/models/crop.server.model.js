'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Product Schema
 */
var CropSchema = new Schema({
  state: {
    type: String,
    default: 'Planning'
  },  
  product: {
    type: String,
    trim: true
  },
  phanbon: {
    type: String,
    default: 'No'
  },
  thuocdietco: {
    type: String,
    default: 'No'
  },
  thuoctrusau: {
    type: String,
    default: 'No'
  },
  startdate: {
    type: String,
    default: ''
  },
  stopdate: {
    type: String,
    default: ''
  },
  harvestdate: {
    type: String,
    default: ''
  },
  note: {
    type: String,
    default: ''
  },
  farm: {
    type: Schema.ObjectId,
    ref: 'Farm'
  }
});

mongoose.model('Crop', CropSchema);