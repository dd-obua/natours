const fileSystem = require('fs');
const express = require('express');

const app = express();

// Middleware
app.use(express.json());

const port = 3000;

const filePath = `${__dirname}/dev-data/data/tours-simple.json`;
const encoding = 'utf-8';
const tours = JSON.parse(fileSystem.readFileSync(filePath, encoding));

const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: { tours },
  });
};

const getTour = (req, res) => {
  const { id } = req.params;

  if (id > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid id',
    });
  }

  const tour = tours.find((tour) => tour.id === +id);

  res.status(200).json({
    status: 'success',
    data: { tour },
  });
};

const createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  const data = JSON.stringify(tours);

  fileSystem.writeFile(filePath, data, (error) => {
    res.status(201).json({
      status: 'success',
      data: { tour: newTour },
    });
  });
};

const updateTour = (req, res) => {
  const { id } = req.params;

  if (id > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid id',
    });
  }

  res.status(200).json({
    status: 'success',
    data: { tour: '<Updated tour here>' },
  });
};

const deleteTour = (req, res) => {
  const { id } = req.params;

  if (id > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid id',
    });
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
};

const rootUrl = '/api/v1';
const resource = '/tours';
const url = `${rootUrl}${resource}`;
const parameter = 'id';
const specificUrl = `${url}/:${parameter}`;

app.route(url).get(getAllTours).post(createTour);
app.route(specificUrl).get(getTour).patch(updateTour).delete(deleteTour);

// Start server
app.listen(port, () => {
  console.log(`App running on port ${port} ...`);
});
