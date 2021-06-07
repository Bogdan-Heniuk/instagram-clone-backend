const db = require('../db')

class Post {
    async get (condition) {
        return db('posts').where(condition)
    }

    async find (username) {
        return db('posts').where('username', 'like', `${username}%`)
    }

    async create (post) {
        return db('posts').insert(post)
    }

    async countPosts (user_id) {
        return db('posts').count('id as posts').where('user_id' , user_id)
    }
}

module.exports = new Post()