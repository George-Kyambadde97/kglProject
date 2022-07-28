const { Schema, model } = require('mongoose');
const creditSalesSchema = new Schema({
  dispatchDate:{
    type: Date,
    default: Date.now
  },
  buyerName:{
    type: String,
    required: true
  },
  nationalId:{
    type: String,
  },
  location:{
    type: String,
  },
  contactNumber:{
    type: String,
  },
  produce:{
    type: Schema.Types.ObjectId,
    ref: 'Procurement'
  },
  amount:{
    type: Number,

  },
  salesAgentname:{
    type: String,
  },
  dueDate:{
    type: Date,
  }
});

const CreditSales = model('CreditSales', creditSalesSchema);

module.exports = CreditSales;
