
const User=require("../models/userModel.js");
const catchAsync = require("../utils/catchAsync.js");
const AppError = require("../utils/appError.js");

exports.getAllUsers = (req, res) => {
  User.find()
  .then((users) =>
    res.json(users)
  )
  };
  exports.getUser = (req, res) => {
    res.status(500).json({
      status: 'error',
      message: 'This route is not yet defined!'
    });
  };
  exports.createUser = (req, res) => {
    res.status(500).json({
      status: 'error',
      message: 'This route is not yet defined!'
    });
  };
  exports.updateUser = (req, res) => {
    res.status(500).json({
      status: 'error',
      message: 'This route is not yet defined!'
    });
  };
  exports.deleteUser=catchAsync(async(req,res,next)=>{
    const user=await User.findByIdAndDelete(req.params.id); 
    if(!user){
        return next(new AppError('User not found',404));
        }
        res.status(204).json({
            status:'success',
            data:null
            });
            });

            exports.deleteUserAll = catchAsync(async (req, res, next) => {
              await User.deleteMany();
            
              res.status(204).json({
                status: 'success',
                data: null
              });
            });
            