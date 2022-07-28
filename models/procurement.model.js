const { Schema, model } = require("mongoose");
const procurementSchema = new Schema({
  produceName: {
    type: String,
  },
  produceType: {
    type: String,
  },
  date: {
    type: String,
  },
  time: {
    type: String,
  },
  tonnage: {
    type: Number,
  },
  cost: {
    type: Number,
  },
  sellingPrice: {
    type: Number,
  },
  dealerName: {
    type: String,
  },
  dealerphone: {
    type: String,
  },
  branchName: {
    type: String,
  },
});

const Procurement = model("Procurement", procurementSchema);

module.exports = Procurement;
