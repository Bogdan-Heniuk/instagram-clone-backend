const express = require('express')
const authRouter = express.Router()
const authController = require('../controller/authController')
const upload = require('../multer')

authRouter.post('/registration', upload.single('file'), authController.registration)
authRouter.post('/login', authController.login)

module.exports = authRouter