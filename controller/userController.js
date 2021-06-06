const User = require('../db/model/user')
const Following = require('../db/model/following')

class UserController {
    async getRecommends(req, res) {
        const isFollowing = await User.checkForSubscriptions(req.user.id)
            .then(result => result.map(element => element.subscribed_id))

        const users = await User.recommends(req.user.id, isFollowing)
        res.status(200).json(users)
    }

    async searchForUsers(req, res) {
        const users = await User.find(req.body.username)

        res.status(200).json(users)
    }

    async getProfile(req, res) {
        const {profile_id} = req.body
        const {id} = req.user
        const profileData = await User.findOne({id: profile_id})
        console.log(profileData);
        if (profile_id === id) return res.status(200).json(profileData)
        const isSubscribed = await Following.checkIfSubscribed(id, profileData.id)

        if (isSubscribed) return res.status(200).json({...profileData, subscribed: true})

        return res.status(200).json({...profileData, subscribed: false})

    }

    async getImage(req, res) {
        res.sendFile('C:/Users/genyu/WebstormProjects/backend/uploads/' + req.params.url)
    }

    async isSubscribed(req, res) {
        const {user_id, profile_id} = req.body
        console.log(user_id);
        console.log(profile_id);
        // const test = await Following.checkIfSubscribed(user_id, profile_id)
        // res.status(200).json({test})
    }

}

module.exports = new UserController()