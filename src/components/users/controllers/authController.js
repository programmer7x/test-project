const crypto = require('crypto');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('../model/User');
const catchAsync = require('../../../utils/catchAsync');
const AppError = require('../../../utils/AppError');

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

const createSendToken = (user, statusCode, res, message) => {
  // in addition we create token and send it back to client, we store the token in cookie
  const cookiesOptions = {
    // expires at 30 day => convert it to timestamp milisecond at create new Date obj from it
    expires: new Date(
      Date.now() + process.env.JWT_COOKIES_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === 'production') cookiesOptions.secure = true;

  const token = signToken(user.id);
  res.cookie('jwt', token, cookiesOptions);
  user.password = undefined;
  res.status(statusCode).json({
    status: 'success',
    message,
    token,
    data: {
      user,
    },
  });
};

exports.signUp = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    email: req.body.email,
    password: req.body.password,
  });

  createSendToken(newUser, 201, res, 'you are signed up successfully!');
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new AppError('please provide your email and password', 400);
  }

  const user = await User.findOne({ where: {
    email
  } })

  if (!user || !(await user.correctPassword(password, user.password))) {
    throw new AppError('email or password are incorrect!', 400);
  }

  createSendToken(user, 200, res, 'you are logged in successfully!');
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  if (!token) {
    throw new AppError(
      'you are not logged in! please log in and try again.',
      401
    );
  }

  const decodeToken = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET
  );

  const currentUser = await User.findByPk(decodeToken.id);
  if (!currentUser) {
    throw new AppError(
      'The user belonging to this token does no longer exist!',
      401
    );
  }

  const changedPassword = currentUser.isChangedPassword(decodeToken.iat);
  if (changedPassword) {
    throw new AppError(
      'user recently changed password, please log in again!',
      401
    );
  }

  req.user = currentUser;
  res.locals.user = currentUser;
  next();
});

exports.restrictTo = function (...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new AppError('you are forbidden to access this part', 403);
    }
    next();
  };
};

exports.updateMyPassword = catchAsync(async (req, res, next) => {
  // 0) check if user send us currentPassword, newPassword, new confirm password
  if (
    !(req.body.currentPassword && req.body.password && req.body.passwordConfirm)
  ) {
    throw new AppError(
      'please enter currentPassword, password and passwordConfirm!',
      400
    );
  }
  // 1) Get the user
  const user = await User.findByPk(req.user.id);
  // 2) check current password is correct or NOT
  if (!(await user.correctPassword(req.body.currentPassword, user.password))) {
    throw new AppError('current password is false!', 400);
  }
  // 3) if so, updatePassword
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();
  // 4) log user in
  createSendToken(
    user,
    200,
    res,
    'your password has been updated successfully!'
  );
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  const user = await User.findOneAndDelete({ _id: req.user._id });
  res.status(204).json({
    status: 'success',
    message: 'user has been deleted successfully!',
    user,
  });
});

exports.logout = catchAsync(async (req, res, next) => {
  if (req.cookies.jwt) {
    // user is logged in, wants to logged out
    res.status(200).clearCookie('jwt').json({
      status: 'success',
      message: 'you are logged out successfully!',
    });
  } else {
    // user in NOT logged in already
    res.status(400).json({
      status: 'fail',
      message: 'you are logged out already!',
    });
  }
});