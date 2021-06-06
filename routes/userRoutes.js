const express = require('express')
const userRouter = express.Router()
const userController = require('../controller/userController')
const followingController = require('../controller/followingController')
const authMiddleware = require('../middleware/authMiddleware')


userRouter.get('/users', authMiddleware, userController.getRecommends)
userRouter.post('/users/subscribe', authMiddleware, followingController.follow)
userRouter.post('/users/unsubscribe', authMiddleware, followingController.unfollow)
userRouter.post('/users/search', userController.searchForUsers)
userRouter.post('/users/profile', authMiddleware, userController.getProfile)
userRouter.get('/uploads/:url', userController.getImage)


module.exports = userRouter

