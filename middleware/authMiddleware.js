const jwt = require('jsonwebtoken')

module.exports = function checkIfAuth(req, res, next) {
    if(req.method === "OPTIONS") next()

    try{
        const token = req.headers.authorization

        if(!token) return res.json({body : "User is not authenticated"})

        req.user = jwt.verify(token, process.env.SECRET)

        next()
    } catch (e) {
        return res.status(403).json({body : "Invalid token"})
    }

}