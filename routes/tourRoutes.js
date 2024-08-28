const express = require('express');

const { rootUrl, specificUrl } = require('./routeUrls');
const {
  getAllTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
} = require('../controllers/tourController');

const app = express();

// Tours Routes
const router = express.Router();
router.route(rootUrl).get(getAllTours).post(createTour);
router.route(specificUrl).get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;
