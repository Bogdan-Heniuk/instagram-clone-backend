const express = require('express')
const userRouter = express.Router()
const userController = require('../controller/userController')
const followingController = require('../controller/followingController')
const authMiddleware = require('../middleware/authMiddleware')

userRouter.get('/users', authMiddleware, userController.getRecommends)
userRouter.post('/users/subscribe', authMiddleware, followingController.follow)
userRouter.post('/users/search', userController.searchForUsers)
userRouter.get('/users/profile/:name', userController.getProfile)

// userRouter.delete('/users', userController.deleteUsers)
// userRouter.patch('/users/block', userController.blockUsers)
// userRouter.patch('/users/unblock', userController.unblockUsers)
// userRouter.post('/users/status', authMiddleware, userController.postStatus)
// userRouter.get('/users/status', authMiddleware, userController.getStatus)

module.exports = userRouter

