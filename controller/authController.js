const User = require('../db/model/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

function generateToken(id, username, name, email, password, avatar) {
    const payload = {
        id,
        username,
        password,
        name,
        email,
        avatar
    }

    return jwt.sign(payload, process.env.SECRET, {expiresIn: "1h"})
}

class AuthController {
    async registration(req, res) {
        try {
            const {username, name, email, password} = req.body
            const avatar = req.file?.filename || null

            const userExists = await User.findOne({email})

            if (userExists) {
                return res.status(403).send({message: "Введенная вами почта уже зарегистрирована в системе"})
            }

            const hashedPassword = bcrypt.hashSync(password, 7);
            const user = await User.postOne({username, name, email, password: hashedPassword, avatar})
            res.status(201).json({user})
        } catch (e) {
            console.log(e)
        }
    }

    async login(req, res) {
        try {
            const {email, password} = req.body

            const user = await User.findOne({email})

            if (!user) return res.status(403).json({message: "Введенное вами имя пользователя не принадлежит аккаунту. Проверьте свое имя пользователя и повторите попытку."})

            const validPassword = bcrypt.compareSync(password, user.password)

            if (!validPassword) return res.status(403).json({message: "К сожалению, вы ввели неправильный пароль. Проверьте свой пароль еще раз."})

            const token = generateToken(user.id, user.username, user.name, user.email, user.password, user.avatar)

            return res.status(200).json({token})
        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = new AuthController()