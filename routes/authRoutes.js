const express = require('express')
const authRouter = express.Router()
const authController = require('../controller/authController')

authRouter.post('/registration', authController.registration)
authRouter.post('/login', authController.login)

module.exports = authRouter