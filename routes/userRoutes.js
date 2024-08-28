const express = require('express');

const { rootUrl, specificUrl } = require('./routeUrls');
const {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/userController');

const app = express();

// Users Routes
const router = express.Router();

router.route(rootUrl).get(getAllUsers).post(createUser);
router.route(specificUrl).get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
