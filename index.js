const express = require('express')
const mongoose = require('mongoose')
const userRouter = require('./routes/userRoutes')
const authRouter = require('./routes/authRoutes')
const cors = require('cors')
require('dotenv').config()

const app = express()

app.use(express.json())
app.use(cors())

app.use('/auth', authRouter)
app.use('/api', userRouter)

async function start() {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.zhwih.mongodb.net/backend?retryWrites=true&w=majority`, {
            useNewUrlParser : true,
            useUnifiedTopology : true,
            useCreateIndex : true
        })
    } catch (e) {
        console.log(e)
    }
}
start()

app.listen(process.env.PORT)
