const fs = require('fs');
const express = require('express');
const morgan = require('morgan');

const app = express();

// Middleware
app.use(morgan('dev'));
app.use(express.json()); // body parser

app.use((req, res, next) => {
  console.log('Hello from the middleware 👋');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

const port = 3000;

const filePath = `${__dirname}/dev-data/data/tours-simple.json`;
const encoding = 'utf-8';
const tours = JSON.parse(fs.readFileSync(filePath, encoding));

// Tours route handlers
const getAllTours = (req, res) => {
  console.log(req.requestTime);

  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
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

  fs.writeFile(filePath, data, (error) => {
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

// Users route handlers
const getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'fail',
    message: 'This route is not yet defined',
  });
};

const createUser = (req, res) => {
  res.status(500).json({
    status: 'fail',
    message: 'This route is not yet defined',
  });
};

const getUser = (req, res) => {
  res.status(500).json({
    status: 'fail',
    message: 'This route is not yet defined',
  });
};

const updateUser = (req, res) => {
  res.status(500).json({
    status: 'fail',
    message: 'This route is not yet defined',
  });
};

const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'fail',
    message: 'This route is not yet defined',
  });
};

const rootUrl = '/';
const toursUrl = '/api/v1/tours';
const usersUrl = '/api/v1/users';
const parameter = 'id';
const specificUrl = `${rootUrl}:${parameter}`;

// Tours Routes
const tourRouter = express.Router();
app.use(toursUrl, tourRouter); // mounting a router on a route

tourRouter.route(rootUrl).get(getAllTours).post(createTour);
tourRouter.route(specificUrl).get(getTour).patch(updateTour).delete(deleteTour);

// Users Routes
const userRouter = express.Router();
app.use(usersUrl, userRouter); // mounting a router on a route

userRouter.route(rootUrl).get(getAllUsers).post(createUser);
userRouter.route(specificUrl).get(getUser).patch(updateUser).delete(deleteUser);

// Start server
app.listen(port, () => {
  console.log(`App running on port ${port} ...`);
});
