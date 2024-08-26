const fs = require('fs');
const express = require('express');

const app = express();

const port = 3000;

const filePath = `${__dirname}/dev-data/data/tours-simple.json`;
const encoding = 'utf-8';
const tours = JSON.parse(fs.readFileSync(filePath, encoding));

// Define tours route
app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: { tours },
  });
});

// Start server
app.listen(port, () => {
  console.log(`App running on port ${port} ...`);
});
