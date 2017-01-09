'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Product Schema
 */
var HarvestSchema = new Schema({  
  planningdate: {
    type: String,
    default: ''
  },
  harvestdate: {
    type: String,
    default: ''
  },
  planyield: {
    type: Number
  },
  harvestyield: {
    type: Number
  },
  plancost: {
    type: Number
  },
  cost: {
    type: Number
  },      
  note: {
    type: String,
    default: ''
  },
  crop: {
    type: Schema.ObjectId,
    ref: 'Crop'
  }
});

mongoose.model('Harvest', HarvestSchema);