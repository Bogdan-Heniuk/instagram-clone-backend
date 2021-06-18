const express = require('express')
const postRouter = express.Router()
const postController = require('../controller/postController')
const upload = require('../multer')
const authMiddleware = require('../middleware/authMiddleware')

postRouter.get('/:id', authMiddleware, postController.get)
postRouter.post('/', authMiddleware, upload.single('image'), postController.create)
postRouter.get('/view/:post_id', authMiddleware, postController.view)
postRouter.post('/view/comment/:post_id', authMiddleware, postController.comment)
postRouter.get('/feed/get', authMiddleware, postController.getFeed)
postRouter.post('/feed/like', authMiddleware, postController.likePost)
postRouter.post('/feed/dislike', authMiddleware, postController.dislikePost)
postRouter.get('/save/:post_id', authMiddleware, postController.save)
postRouter.get('/unsave/:post_id', authMiddleware, postController.unsave)

module.exports = postRouter