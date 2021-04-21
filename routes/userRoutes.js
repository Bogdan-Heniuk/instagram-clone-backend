const express = require('express')
const userRouter = express.Router()
const userController = require('../controller/userController')
const checkIfAuth = require('../middleware/authMiddleware')

userRouter.get('/users', checkIfAuth, userController.getUsers)
userRouter.delete('/users', userController.deleteUsers)
userRouter.patch('/users/block', userController.blockUsers)
userRouter.patch('/users/unblock', userController.unblockUsers)

module.exports = userRouter

