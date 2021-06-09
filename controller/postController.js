const Post = require('../db/model/post')
const Following = require('../db/model/following')
class PostController {
    async get (req, res) {
        const {id} = req.params
        const posts = await Post.get({user_id : id})
        res.status(200).json(posts)
    }

    async create (req, res) {
        const post = {...req.body, image : req.file.filename, user_id : req.user.id}
        await Post.create(post)
        res.status(201).json(post)
    }

    async getFeed (req,res){
        const {id} = req.user
        const followings = await Following.checkForSubscriptions(id)
            .then(result => result.map(element => element.subscribed_id))
        const feed = await Post.feed(followings)
        res.status(200).json(feed)
    }
}

module.exports = new PostController()