const db = require('../db')

class Post {
    async get (condition) {
        return db('posts').where(condition)
    }

    async feed (followings) {
        return db('posts')
            .join('users', 'users.id', 'posts.user_id')
            .select('*')
            .whereIn('user_id', followings)
    }

    async isLiked (user_id, post_id) {
        return db('likes')
            .select('*')
            .where('user_id', user_id)
            .where('post_id', post_id)
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
}

module.exports = new Post()