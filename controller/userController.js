const User = require('../db/model/user')
const Following = require('../db/model/following')
const Post = require('../db/model/post')

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

        let profileData = await User.findOne({id: profile_id})

        const followers = (await Following.countFollowers(profileData.id))[0].followers
        const followings = (await Following.countFollowings(profileData.id))[0].followings
        const postsNumber = (await Post.countPosts(profile_id))[0].posts
        profileData = {...profileData, followers, followings, postsNumber}
        if (profile_id === id) return res.status(200).json(profileData)

        const isSubscribed = await Following.checkIfSubscribed(id, profileData.id)

        if (isSubscribed) {
            profileData = {...profileData, subscribed: true}
            return res.status(200).json(profileData)
        }

        profileData = {...profileData, subscribed: false}
        return res.status(200).json(profileData)

    }

    async getImage(req, res) {
        res.sendFile('C:/Users/genyu/WebstormProjects/backend/uploads/' + req.params.url)
    }

}

module.exports = new UserController()