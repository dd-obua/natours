const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app');

// Connect to the database
const connectionString = process.env.CONNECTION_STRING.replace(
  '<db_name>',
  process.env.DB_NAME
).replace('<db_password>', encodeURIComponent(process.env.DB_PASSWORD));

const localConnectionString = process.env.LOCAL_CONNECTION_STRING.replace(
  '<db_name>',
  process.env.DB_NAME
);

mongoose
  .connect(connectionString)
  .then(() => console.log('DB connection successful'));

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

// Tour model
const Tour = mongoose.model('Tour', tourSchema);

// Tour data
const tourData = {
  name: 'The Park Camper',
  price: 997,
};

const testTour = new Tour(tourData);

testTour
  .save()
  .then((doc) => console.log(doc))
  .catch((error) => console.log(error));

// Start server
const port = process.env.port || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port} ...`);
});
