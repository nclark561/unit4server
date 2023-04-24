import express, { Application } from 'express'

require('dotenv').config()
const { PORT } = process.env

const cors = require('cors')

const app: Application = express()
app.use(cors())
app.use(express.json())

const { register, login} = require('./controllers/auth')
const { getAllPosts, getCurrentUserPosts, addPost, editPost, deletePost } = require('./controllers/post')
const { isAuthenticated } = require('./middleware/isAuthenticated')


app.post('/register', register)

app.post('/login', login)

app.get('/posts', getAllPosts)

app.get('/userposts/:userId', getCurrentUserPosts)

app.post('/posts', isAuthenticated, addPost)

app.put('/posts/:id', isAuthenticated, editPost)

app.delete('/posts/:id', isAuthenticated, deletePost)



app.listen(PORT, () => console.log(`app listening on port ${PORT}`))