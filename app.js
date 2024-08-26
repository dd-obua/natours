const fileSystem = require('fs');
const express = require('express');

const app = express();

// Middleware
app.use(express.json());

const port = 3000;

const filePath = `${__dirname}/dev-data/data/tours-simple.json`;
const encoding = 'utf-8';
const tours = JSON.parse(fileSystem.readFileSync(filePath, encoding));

// Define tours route with get
app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: { tours },
  });
});

// Define tours route with post
app.post('/api/v1/tours', (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  console.log(newId);
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  const data = JSON.stringify(tours);

  fileSystem.writeFile(filePath, data, (error) => {
    res.status(201).json({
      status: 'success',
      data: { tour: newTour },
    });
  });
});

// Start server
app.listen(port, () => {
  console.log(`App running on port ${port} ...`);
});
