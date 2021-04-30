const User = require('../db/model/customer')

class CustomerController {
   async getCustomers (req, res) {
       try{
           const customers = await User.all()
           res.status(200).json(customers)
       } catch (e) {
           console.log(e)
       }
   }

   // async deleteUsers(req, res) {
   //     const {_id} = req.query
   //     try{
   //         await User.deleteOne({_id})
   //         res.status(200).json({message : "ok"})
   //     } catch (e) {
   //         console.log(e)
   //     }
   // }
   //
   //  async blockUsers(req, res) {
   //      const {_id} = req.query
   //      try{
   //          await User.updateOne({_id}, {status : "blocked"})
   //          res.status(200).json({message : "ok"})
   //      } catch (e) {
   //          console.log(e)
   //      }
   //  }
   //
   //  async unblockUsers(req, res) {
   //      const {_id} = req.query
   //      try{
   //          await User.updateOne({_id}, {status : "active"})
   //          res.status(200).json({message : "ok"})
   //      } catch (e) {
   //          console.log(e)
   //      }
   //  }
   //
   //  async postStatus (req, res) {
   //      const {status} = req.body
   //      const {id} = req.user
   //
   //      try {
   //          await Status.findOneAndUpdate({user_id : id}, {status}, {upsert: true})
   //          res.status(200).json({body: "ok"})
   //      } catch (e) {
   //          console.log(e);
   //      }
   //  }
   //
   //  async getStatus (req, res) {
   //      const {id} = req.query
   //      try {
   //          const response = await Status.findOne({user_id : id})
   //          res.status(200).json(response.status)
   //      } catch (e) {
   //          console.log(e);
   //      }
   //  }
}

module.exports = new CustomerController()