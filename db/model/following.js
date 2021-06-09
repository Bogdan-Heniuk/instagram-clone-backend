const db = require('../db')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))


class Following {
    async checkIfSubscribed (subscriber_id, subscribed_id) {
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

    async countFollowings (user_id) {
        return db('following').count('id as followings').where('subscriber_id' , user_id)
    }

    async countFollowers (user_id) {
        return db('following').count('id as followers').where('subscribed_id' , user_id)
    }

    async unsubscribe(subscriber_id, subscribed_id) {
        return db('following').delete().where({
            subscriber_id,
            subscribed_id
        })
    }

    async checkForSubscriptions (user_id) {
        return db('following')
            .select('subscribed_id')
            .where('subscriber_id', user_id)
    }
}

module.exports = new Following()