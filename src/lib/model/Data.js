const mongoose = require('mongoose');
const { Schema } = mongoose;

const DataSchema = new Schema({
  content: { type: String, required: true },
  language: { type: String, required: true },
}, { timestamps: true });

const Data = mongoose.models.Data || mongoose.model('Data', DataSchema);

module.exports = Data;
