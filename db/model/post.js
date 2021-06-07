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
}

module.exports = new Post()