const Post = require('../db/model/post')
const Following = require('../db/model/following')

class PostController {
    async get(req, res) {
        const {id} = req.params
        const posts = await Post.get({user_id: id})
        res.status(200).json(posts)
    }

    async create(req, res) {
        const post = {...req.body, image: req.file.filename, user_id: req.user.id}
        await Post.create(post)
        res.status(201).json(post)
    }

    async getFeed(req, res) {
        const user_id = req.user.id
        const followings = await Following.checkForSubscriptions(user_id)
            .then(result => result.map(element => element.subscribed_id))

        const posts = await Post.feed(followings)

        const feed = await Promise.all(posts.map(async post => {
            const likes = (await Post.countLikes(post.post_id))[0].likes
            const isLiked = !!(await Post.isLiked(user_id, post.post_id))
            const isSaved = !!(await Post.isSaved(user_id, post.post_id))
            return {...post, isLiked, isSaved, likes}
        }))


        res.status(200).json(feed)
    }

    async likePost(req, res) {
        const user_id = req.user.id
        const {post_id} = req.body

        const isLiked = await Post.isLiked(user_id, post_id)
        if (isLiked) return res.status(403).json({message: "forbidden"})

        await Post.like(user_id, post_id)
        res.status(201).json({message: "ok"})

    }

    async dislikePost(req, res) {
        const user_id = req.user.id
        const {post_id} = req.body

        const isLiked = await Post.isLiked(user_id, post_id)
        if (!isLiked) return res.status(403).json({message: "forbidden"})

        await Post.dislike(user_id, post_id)
        res.status(201).json({message: "ok"})

    }

    async view(req, res) {
        const user_id = req.user.id
        const post_id = Number(req.params.post_id)
        const post = await Post.findOne(post_id)
        const likes = (await Post.countLikes(post_id))[0].likes
        const isLiked = !!(await Post.isLiked(user_id, post_id))
        const isSaved = !!(await Post.isSaved(user_id, post_id))
        res.status(200).json({...post, likes, isLiked, isSaved})
    }
}

module.exports = new PostController()