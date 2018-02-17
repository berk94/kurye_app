'use strict';

const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const Item = require('./item');
const Deliverer = require('./deliverer');
const Customer = require('./customer');

var orderSchema = new Schema({
 itemID: {type: Schema.Types.ObjectId, ref: "Item"},
 delivererID: {type: Schema.Types.ObjectId, ref: "Deliverer"},
 customerID: {type: Schema.Types.ObjectId, ref: "Customer"},
 startDate: {type: Date, required: [true, 'startDate is required.']},
 endDate: {type: Date, required: [true, 'startDate is required.']},
 createdAt: { type: Date, default: Date.now }
});

orderSchema.statics.all = function(cb) {
  return this.find({}, cb);
}

orderSchema.virtual('totalWeight').get(function () {
  item = Item.find({id:this.itemID});
  return item.weight;
});

orderSchema.virtual('totalVolume').get(function () {
  item = Item.find({id:this.itemID});
  return item.volume;
});

orderSchema.virtual('totalPrice').get(function () {
  item = Item.find({id:this.itemID});
  return item.price;
});

module.exports = mongoose.model('Order', orderSchema);
