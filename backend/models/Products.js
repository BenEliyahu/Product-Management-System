const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, maxLength: 50 },
  code: { type: Number, required: true , min: 0 , unique: true },
  description: { type: String , textarea: true },
  type: { type: String, enum: ['Vegetable', 'Fruit', 'Field Crop'], required: true },
  marketingDate: { type: Date, default: new Date(
      new Date().getTime() - 7 * 24 * 60 * 60 * 1000
    ).toISOString(),
  },
  image:{
    type: String,
    required: true
}
});

module.exports = mongoose.model('Product', productSchema);
