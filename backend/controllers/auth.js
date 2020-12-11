const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/User");
const asyncHandler = require("../middleware/async");

//@desc Register User
//@route POST /api/v1/auth/register
//@access public
exports.registerUser = asyncHandler(async (req, res, next) => {
  console.log(req.body);
  const { firstName, lastName, email, password, profile, phone } = req.body;
  //create user
  try {
    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
      phone,
      profile,
    });
    console.log(user);
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.log(error);
  }
});

exports.getUserDetails = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.query.id);
  res.status(200).json({
    success: true,
    data: user,
  });
});

exports.getAllUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find({});
  console.log(users);
  res.status(200).json({
    success: true,
    data: users,
  });
});

exports.deleteUser = asyncHandler(async (req, res, next) => {
  const id = req.body.id;
  console.log(req.body);
  const found = User.findById(id);
  console.log(id);
  if (!found) {
    return next(new ErrorResponse(`No User Found against id ${id}`));
  }
  const deleted = await User.findByIdAndDelete(id);
  console.log(deleted);
  res.status(200).json({
    success: true,
    data: {},
  });
});

exports.updateUser = asyncHandler(async (req, res, next) => {
  const { id, firstName, lastName, email, profile, phone } = req.body;
  const found = User.findById(id);
  if (!found) {
    return next(new ErrorResponse(`No User Found against id ${id}`));
  }
  const updated = await User.findByIdAndUpdate(id, {
    firstName,
    lastName,
    email,
    profile,
    phone,
  });
  const user = await User.findById(id);
  res.status(200).json({
    success: true,
    data: user,
  });
});
