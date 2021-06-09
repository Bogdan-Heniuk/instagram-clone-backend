const db = require('../db')

class User {
    async findOne (condition) {
        return db('users').where(condition).first()
    }

    async find (username) {
        return db('users').where('username', 'like', `${username}%`)
    }

    async recommends(user_id, subscribes) {
        return db('users')
            .select('*')
            .whereNotIn('id', subscribes)
            .andWhereNot('id', user_id)
            .limit(5)
    }


    async postOne (user) {
        return db('users').insert(user)
    }
}

module.exports = new User()