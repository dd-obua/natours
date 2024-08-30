const express = require('express');
const tourController = require('../controllers/tourController');

const { getAllTours, getTour, createTour, updateTour, deleteTour, checkId } =
  tourController;

// Tours Routes
const router = express.Router();

// Param middleware
const parameter = 'id';
router.param(parameter, checkId);

router.route('/').get(getAllTours).post(createTour);
router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;
