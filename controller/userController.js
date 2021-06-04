const User = require('../db/model/user')

class UserController {
    async getRecommends (req, res) {
        const isFollowing = await User.checkForSubscriptions(req.user.id)
            .then(result => result.map(element => element.subscribed_id))

        const users = await User.recommends(req.user.id, isFollowing)
        res.status(200).json(users)
    }

    async searchForUsers (req, res) {
        if(!req.body.username) {
            res.status(200).json([])
        } else {
            const users = await User.find(req.body.username)

            res.status(200).json(users)
        }
    }

    async getProfile (req, res) {
        const {name} = req.params
        const profileData = await User.findOne({username : name})
        res.status(200).json(profileData)
    }

}

module.exports = new UserController()