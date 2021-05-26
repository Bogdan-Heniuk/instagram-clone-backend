const express = require('express')
const userRouter = express.Router()
const authMiddleware = require('../middleware/authMiddleware')

// userRouter.get('/users',  userController.getAll)
// userRouter.delete('/users', userController.deleteUsers)
// userRouter.patch('/users/block', userController.blockUsers)
// userRouter.patch('/users/unblock', userController.unblockUsers)
// userRouter.post('/users/status', authMiddleware, userController.postStatus)
// userRouter.get('/users/status', authMiddleware, userController.getStatus)

module.exports = userRouter

