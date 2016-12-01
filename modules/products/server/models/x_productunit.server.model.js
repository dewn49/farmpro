'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


/**
 * Product Unit Schema
 */
var ProductUnitSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Nhập tên đơn vị sản phẩm',
    trim: true
  },
});

mongoose.model('ProductUnit', ProductUnitSchema);