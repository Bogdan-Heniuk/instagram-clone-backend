const User = require('../model/user')

class UserController {
   async getUsers (req, res) {

       try{
           const users = await User.find({})
           res.status(200).json(users)
       } catch (e) {
           console.log(e)
       }
   }

   async deleteUsers(req, res) {
       const {_id} = req.query
       try{
           await User.deleteOne({_id})
           res.status(200).json({message : "ok"})
       } catch (e) {
           console.log(e)
       }
   }

    async blockUsers(req, res) {
        const {_id} = req.query
        try{
            await User.updateOne({_id}, {status : "blocked"})
            res.status(200).json({message : "ok"})
        } catch (e) {
            console.log(e)
        }
    }

    async unblockUsers(req, res) {
        const {_id} = req.query
        try{
            await User.updateOne({_id}, {status : "active"})
            res.status(200).json({message : "ok"})
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = new UserController()