const Following = require('../db/model/following')


class FollowingController {
    async follow(req, res) {
        try {
            const {subscribed_id} = req.body
            const subscriber_id = req.user.id

            const isSubscribed = await Following.checkIfSubscribed(subscriber_id, subscribed_id)

            if(isSubscribed) return

            if (!subscriber_id || !subscribed_id)
                return res.status(404).json({message: "not found"})

            await Following.subscribe(subscriber_id, subscribed_id)
            res.sendStatus(200)
        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = new FollowingController()