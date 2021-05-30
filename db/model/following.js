const db = require('../db')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))


class Following {
    async checkIfSubscribed (subscriber_id, subscribed_id) {
        // console.log(subscribed_id);
        return db('following')
            .select('*')
            .where('subscriber_id', subscriber_id)
            .where('subscribed_id', subscribed_id)
            .first()
    }

    async subscribe(subscriber_id, subscribed_id) {
        return db('following').insert({
            subscriber_id,
            subscribed_id
        })
    }
}

module.exports = new Following()