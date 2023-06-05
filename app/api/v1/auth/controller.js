const { signIn } = require('../../../services/mongoose/auth');

const { StatusCodes } = require('http-status-codes');

const signInCms = async (req, res, next) => {
  try {
    const result = await signIn(req);

    res.status(StatusCodes.CREATED).json({
      data: { token: result }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { signInCms };