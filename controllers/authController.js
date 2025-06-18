
const AppError = require("../utils/appError");
const jwt = require('jsonwebtoken');
const catchAsync = require('../utils/catchAsync'); // adjust the path as needed
const User = require('../models/userModel');       // your User model

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm
  });

  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });

  res.status(201).json({
    status: "success",
    token,
    data: {
      user: newUser
    }
  });
});

exports.login = catchAsync(async (req, res, next) => {
    // 1. Check if email and password exist
    const { email, password } = req.body;
    if (!email || !password)
      return next(new AppError('Please provide email and password!', 400));
  
    // 2. Check if user exists & password is correct
    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.correctPassword(password, user.password)))
      return next(new AppError('Incorrect email or password', 401));
  
    // 3. If everything ok, send token to client
    const token = jwt.sign({email:email}, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN
    });

  
    res.status(200).json({
      status: 'success',
      token,
      data: {
        email
      }
    });
  });
  
