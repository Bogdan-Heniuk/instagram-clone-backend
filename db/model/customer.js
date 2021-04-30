const db = require('../db')

class Customer {
    async all() {
        return await db('users')
    }
}

module.exports = new Customer()