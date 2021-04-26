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



app.listen(process.env.PORT)
