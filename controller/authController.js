const User = require('../model/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

function generateToken (id, username, email, password, registered, lastLogin = new Date(), status) {
    const payload = {
        id,
        username,
        password,
        registered,
        lastLogin
    }

    return jwt.sign(payload, process.env.SECRET, {expiresIn:"1h"})
}

class AuthController {
    async registration(req, res) {
        try{
            const {username, email, password} = req.body
            const userExists = await User.findOne({email})

            if(userExists) {
                return res.status(400).json({body : "user exists"})
            }

            const hashedPassword = bcrypt.hashSync(password, 7);
            const user = new User({username, email, password : hashedPassword, registered : new Date()})
            await user.save()
            res.status(201).json(user)
        } catch (e){
            console.log(e)
        }

    }

    async login (req, res) {
        try{
            const {email, password} = req.body

            const user = await User.findOne({email})

            if(!user) return res.json({message : "User not found"})

            const validPassword = bcrypt.compareSync(password, user.password)

            if(!validPassword) return res.json({message : "Invalid password"})

            await User.updateOne({email}, {lastLogin : new Date()})

            const token = generateToken(user._id, user.username, user.email, user.password, user.registered, user.status)

            return res.json({token})
        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = new AuthController()