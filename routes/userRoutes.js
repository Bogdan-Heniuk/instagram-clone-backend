const express = require('express')
const userRouter = express.Router()
const userController = require('../controller/userController')

userRouter.get('/users', userController.getUsers)
userRouter.delete('/users', userController.deleteUsers)
userRouter.patch('/users/block', userController.blockUsers)
userRouter.patch('/users/unblock', userController.unblockUsers)

module.exports = userRouter

