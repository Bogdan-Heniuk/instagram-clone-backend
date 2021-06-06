const Following = require('../db/model/following')


class FollowingController {
    async follow(req, res) {
        try {
            const {profile_id} = req.body
            const subscriber_id = req.user.id
            const isSubscribed = await Following.checkIfSubscribed(subscriber_id, profile_id)

            if(isSubscribed) return

            if (!subscriber_id || !profile_id)
                return res.status(404).json({message: "not found"})

            await Following.subscribe(subscriber_id, profile_id)
            res.sendStatus(200)
        } catch (e) {
            console.log(e);
        }
    }

    async unfollow(req, res) {
        try {
            const {profile_id} = req.body
            const subscriber_id = req.user.id
            const isSubscribed = await Following.checkIfSubscribed(subscriber_id, profile_id)

            if(!isSubscribed) return

            if (!subscriber_id || !profile_id)
                return res.status(404).json({message: "not found"})

            await Following.unsubscribe(subscriber_id, profile_id)
            res.sendStatus(200)
        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = new FollowingController()