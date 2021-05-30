const Following = require('../db/model/following')

class FollowingController {
    async follow(req, res) {
        try {
            const {subscriber_id, subscribed_id} = req.body

            if (!subscriber_id || !subscribed_id)
                return res.status(404).json({message: "not found"})

            await Following.subscribe(subscriber_id, subscribed_id)

        } catch (e) {
            console.log(e);
        }
    }
}