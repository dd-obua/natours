// Users route handlers
const routeError = (res) => {
  return res.status(500).json({
    status: 'fail',
    message: 'This route is not yet defined',
  });
};

exports.getAllUsers = (req, res) => {
  routeError(res);
};

exports.createUser = (req, res) => {
  routeError(res);
};

exports.getUser = (req, res) => {
  routeError(res);
};

exports.updateUser = (req, res) => {
  routeError(res);
};

exports.deleteUser = (req, res) => {
  routeError(res);
};
