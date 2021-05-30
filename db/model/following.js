const db = require('../db')

class Following {
    async subscribe(subscriber_id, subscribed_id) {
        return db('following').insert({
            subscriber_id,
            subscribed_id
        })
    }
}

module.exports = new Following()