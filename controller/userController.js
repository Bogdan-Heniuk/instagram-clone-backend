const User = require('../db/model/user')

class UserController {
    async getUsers (req, res) {
        const check = await User.checkForSubscriptions(req.user.id)
        const subscriptions_id = await User.subscriptions(req.user.id, check)
        const subscriptions_array = subscriptions_id.map(element => element.subscribed_id)
        console.log(subscriptions_array);
        const users = await User.recommends(req.user.id, subscriptions_array)
        res.status(200).json(users)
    }
}

module.exports = new UserController()