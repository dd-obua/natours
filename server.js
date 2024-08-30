const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: './config.env' });

// Start server
const port = process.env.port || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port} ...`);
});
