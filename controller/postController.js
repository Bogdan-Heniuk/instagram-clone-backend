const Post = require('../db/model/post')

class PostController {
    async get (req, res) {
        const {id} = req.user
        const posts = await Post.get({user_id : id})
        res.status(200).json(posts)
    }

    async create (req, res) {
        const post = {...req.body, image : req.file.filename, user_id : req.user.id}
        await Post.create(post)
        res.status(201).json(post)
    }
}

module.exports = new PostController()