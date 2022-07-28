const { Schema, model } = require('mongoose');

const salesSchema = new Schema({
  date:{
    type: String,
    default: Date.now
  },
  produce:{
    type: Schema.Types.ObjectId,
    ref: 'Procurement'
  },
  amount:{
    type: Number,
  },
  buyerName:{
    type: String,
    required: true
  },
  buyerPhone:{
    type: String,
  },
  salesAgentname:{
    type: String,
  }
});

const Sales = model('Sales', salesSchema);

module.exports = Sales;
