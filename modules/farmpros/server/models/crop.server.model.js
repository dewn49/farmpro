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
    default: 'Lập kế hoạch'
  },  
  product: {
    type: Schema.ObjectId,
    ref: 'Product'
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
    type: Date,
    default: Date.now
  },
  stopdate: {
    type: Date,
    default: Date.now
  },
  harvest: {
    type: Date,
    default: Date.now
  },
  note: {
    type: String,
    default: ''
  },
  user: {
    type: Schema.ObjectId,
    ref: 'Farm'
  }
});

mongoose.model('Crop', CropSchema);