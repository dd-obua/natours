const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

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

const toursUrl = '/api/v1/tours';
const usersUrl = '/api/v1/users';

// Mount routers on routes
app.use(toursUrl, tourRouter);
app.use(usersUrl, userRouter);

module.exports = app;
