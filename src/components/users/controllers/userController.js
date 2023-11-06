const catchAsync = require('../../../utils/catchAsync');
const {User} = require('./../../../connectionDB');
const AppError = require('../../../utils/AppError')

exports.getAllUsers = catchAsync(async(req,res,next) => {
    const users = await User.findAll();

    res.status(200).json({
        status:'success',
        message: 'all users are fetched!',
        data: {
            users
        }
    })
})

exports.getOne = catchAsync(async(req,res,next) => {
    const { userId } = req.params;

    const user = await User.findByPk(userId)

    if(!user) {
        throw new AppError('user is not found by this id!', 404)
    }

    res.status(200).json({
        status: 'success',
        message: "user is found successfully!",
        data: {
            user
        }
    })
})

exports.deleteOneUser = catchAsync(async(req,res,next) => {
    const { userId } = req.params;

    const removedUser = await User.destroy({
        where: {
            id: userId
        }
    });

    if(!removedUser) {
        throw new AppError('user is not found by this id', 404);
    }

    res.status(204).json({
        status: 'success',
        message: 'user is removed successfully!',
        data: {
            removedUser
        }
    })
})

exports.updateOneUser = catchAsync(async(req,res,next) => {
    const { userId } = req.params;


    const updatedUser = await User.update(req.body, {
        where: {id: userId}
    }) 

    if(!updatedUser) {
        throw new AppError('user is not found by this id', 404)
    }

    res.status(200).json({
        status: 'success',
        message: 'user is updated successfully!',
        data: {
            updatedUser
        }
    })
});

