const { model, Schema } = require('mongoose');

const schema = new Schema({
  make: { type: String, required: [true, 'Make is required'] },
  model: { type: String, required: [true, 'Model is required'] },
  year: {
    type: Number,
    min: [1950, 'Year must be between 1950 and 2050'],
    max: [2050, 'Year must be between 1950 and 2050'],
    required: [true, 'Year is required'],
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    minLength: [10, 'Decription must be at least 10 characters long'],
  },
  price: { type: Number, required: [true, 'Price is required'] },
  img: { type: String, required: [true, 'Image is required'] },
  material: { type: String },
});

const Item = model('Item', schema);

module.exports = Item;
