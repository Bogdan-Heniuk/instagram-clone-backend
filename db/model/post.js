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

    async create (post) {
        return db('posts').insert(post)
    }

    async countPosts (user_id) {
        return db('posts').count('id as posts').where('user_id' , user_id)
    }
}

module.exports = new Post()