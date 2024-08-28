const express = require('express');

const { rootUrl, specificUrl } = require('./routeUrls');

const app = express();

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

// Users Routes
const router = express.Router();

router.route(rootUrl).get(getAllUsers).post(createUser);
router.route(specificUrl).get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
