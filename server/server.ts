import express, { Application } from 'express'
import sequelize from './util/database'

import User from './models/user'
import Post from './models/post'

require('dotenv').config()
const { PORT } = process.env

const cors = require('cors')

const app: Application = express()
app.use(cors())
app.use(express.json())

const { register, login} = require('./controllers/auth')
const { getAllPosts, getCurrentUserPosts, addPost, editPost, deletePost } = require('./controllers/post')
const { isAuthenticated } = require('./middleware/isAuthenticated')


User.hasMany(Post)
Post.belongsTo(User)


app.post('/register', register)

app.post('/login', login)

app.get('/posts', getAllPosts)

app.get('/userposts/:userId', getCurrentUserPosts)

app.post('/posts', isAuthenticated, addPost)

app.put('/posts/:id', isAuthenticated, editPost)

app.delete('/posts/:id', isAuthenticated, deletePost)



sequelize.sync()
    .then(() => {
        app.listen(PORT, () => console.log(`app listening on port ${PORT}`))
    })