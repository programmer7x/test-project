const crypto = require('crypto');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('../model/User');
const catchAsync = require('../../../utils/catchAsync');
const AppError = require('../../../utils/AppError');
const { decode } = require('punycode');

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

  console.log({user})

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
    fullname: req.body.fullname,
    email: req.body.email,
    password: req.body.password,
  });

  createSendToken(newUser.rows[0], 201, res, 'you are signed up successfully!');
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findByEmail(email);

  if(!user.rows[0]) {
    throw new AppError('email or password are incorrect!', 404)
  }

  const comparedPasswordResult = User.comparePassword(password, user.rows[0].password);

  if (!comparedPasswordResult) {
    throw new AppError('email or password are incorrect!', 400);
  }

  createSendToken(user.rows[0], 200, res, 'you are logged in successfully!');
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

    if(!decodeToken.id) {
      throw new AppError('token is not valid!', 401)
    }

    console.log(decodeToken);

  const currentUser = await User.findById(decodeToken.id);

  if (!currentUser.rows[0]) {
    throw new AppError(
      'The user belonging to this token does no longer exist!',
      401
    );
  }``

  // const changedPassword = currentUser.isChangedPassword(decodeToken.iat);
  // if (changedPassword) {
  //   throw new AppError(
  //     'user recently changed password, please log in again!',
  //     401
  //   );
  // }

  req.user = currentUser.rows[0];
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

// exports.updateMyPassword = catchAsync(async (req, res, next) => {
//   // 0) check if user send us currentPassword, newPassword, new confirm password
//   if (
//     !(req.body.currentPassword && req.body.password && req.body.passwordConfirm)
//   ) {
//     throw new AppError(
//       'please enter currentPassword, password and passwordConfirm!',
//       400
//     );
//   }
//   // 1) Get the user
//   const user = await User.findById(req.user.id);
//   // 2) check current password is correct or NOT
//   if (!User.comparePassword(req.body.currentPassword, user.password)) {
//     throw new AppError('current password is false!', 400);
//   }
//   // 3) if so, updatePassword
//   user.password = req.body.password;
//   user.passwordConfirm = req.body.passwordConfirm;
//   await user.save();
//   // 4) log user in
//   createSendToken(
//     user,
//     200,
//     res,
//     'your password has been updated successfully!'
//   );
// });

exports.deleteMe = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.user.id);
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