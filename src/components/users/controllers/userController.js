const catchAsync = require('../../../utils/catchAsync');
const User = require('./../model/User');
const AppError = require('../../../utils/AppError')

exports.getAllUsers = catchAsync(async(req,res,next) => {
    const users = await User.findAll();

    res.status(200).json({
        status:'success',
        message: 'all users are fetched!',
        data: {
            users: users.rows
        }
    })
})

exports.getOne = catchAsync(async(req,res,next) => {
    const { userId } = req.params;

    const user = await User.findById(userId)

    if(user.rows.length == 0) {
        throw new AppError('user is not found by this id!', 404)
    }

    res.status(200).json({
        status: 'success',
        message: "user is found successfully!",
        data: {
            user: user.rows[0]
        }
    })
})

exports.deleteOneUser = catchAsync(async(req,res,next) => {
    const { userId } = req.params;

    const removedUser = await User.findByIdAndDelete(userId);   

    if(!removedUser.rows[0]) {
        throw new AppError('user is not found by this id', 404);
    }

    res.status(204).json({
        status: 'success',
        message: 'user is removed successfully!',
        data: {
            removedUser: removedUser.rows[0]
        }
    })
})

exports.updateOneUser = catchAsync(async(req,res,next) => {
    const { userId } = req.params;

    const updatedUser = await User.findByIdAndupdate(userId, req.body);

    if(!updatedUser.rows[0]) {
        throw new AppError('user is not found by this id', 404)
    }

    res.status(200).json({
        status: 'success',
        message: 'user is updated successfully!',
        data: {
            updatedUser: updatedUser.rows[0]
        }
    })
});

