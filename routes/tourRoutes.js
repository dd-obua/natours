const express = require('express');

const { rootUrl, specificUrl } = require('./routeUrls');
const tourController = require('../controllers/tourController');

const { getAllTours, getTour, createTour, updateTour, deleteTour } =
  tourController;

// Tours Routes
const router = express.Router();
router.route(rootUrl).get(getAllTours).post(createTour);
router.route(specificUrl).get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;
