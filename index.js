const express = require('express')
const userRouter = require('./routes/userRoutes')
const authRouter = require('./routes/authRoutes')
const postRouter = require('./routes/postRoutes')

const cors = require('cors')
require('dotenv').config()
const app = express()

app.use(express.json())
app.use(cors())

app.use('/auth', authRouter)
app.use('/', userRouter)
app.use('/posts', postRouter)



app.listen(process.env.PORT)
