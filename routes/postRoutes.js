const express = require('express')
const postRouter = express.Router()
const postController = require('../controller/postController')
const upload = require('../multer')
const authMiddleware = require('../middleware/authMiddleware')

postRouter.get('/:id', authMiddleware, postController.get)
postRouter.post('/', authMiddleware, upload.single('image'), postController.create)
postRouter.get('/feed/get', authMiddleware, postController.getFeed)

module.exports = postRouter