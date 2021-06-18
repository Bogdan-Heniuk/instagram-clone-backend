const db = require('../db')

class Post {
    async get (user_id) {
        return db('posts').where('user_id', user_id)
    }

    async findOne (post_id) {
        return db('posts')
            .join('users', 'users.id', 'posts.user_id')
            .select('posts.id as post_id',
                'users.username', 'users.avatar',
                'users.id as user_id','posts.description',
                'posts.image')
            .where('posts.id', post_id).first()
    }

    async feed (followings) {
        return db('posts')
            .join('users', 'users.id', 'posts.user_id')
            .select('posts.id as post_id', 'users.username', 'users.avatar', 'users.id as user_id','description', 'image')
            .whereIn('user_id', followings)
    }

    async isLiked (user_id, post_id) {
        return db('likes')
            .select('*')
            .where({post_id, user_id})
            .first()
    }
    async isSaved (user_id, post_id) {
        return db('saves')
            .select('*')
            .where('user_id', user_id)
            .where('post_id', post_id)
            .first()
    }

    async like (user_id, post_id) {
        return db('likes').insert({user_id, post_id})
    }

    async dislike (user_id, post_id) {
        return db('likes').delete().where({user_id, post_id})
    }

    async create (post) {
        return db('posts').insert(post)
    }

    async countPosts (user_id) {
        return db('posts').count('id as posts').where('user_id' , user_id)
    }

    async countLikes (post_id) {
        return db('likes').count('id as likes').where('post_id' , post_id)
    }

    async comment (post_id, user_id, text) {
        return db('comments').insert({post_id, user_id, text})
    }

    async getComments(post_id) {
        return db('comments')
            .join('users', 'users.id', 'comments.user_id')
            .where('post_id', post_id)
            .select('users.id', 'users.username',
                'users.avatar', 'comments.text')
    }

    async save (user_id, post_id) {
        return db('saves').insert({user_id, post_id})
    }

    async unsave (user_id, post_id) {
        return db('saves').delete().where({user_id, post_id})
    }

}

module.exports = new Post()