const User = require('../db/model/user')

class UserController {
    async getUsers (req, res) {
        const check = await User.checkForSubscriptions(req.user.id).then(result => result.map(element => element.subscribed_id))

        const users = await User.recommends(req.user.id, check)
        console.log(users);
        res.status(200).json(users)
    }
}

module.exports = new UserController()