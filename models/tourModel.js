const mongoose = require('mongoose');

// mongoose schema
const tourDefinition = {
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true,
  },
  rating: { type: Number, default: 4.5 },
  price: { type: Number, required: [true, 'A tour must have a price'] },
};

const tourSchema = new mongoose.Schema(tourDefinition);

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
