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

// Start server
const port = process.env.port || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port} ...`);
});
