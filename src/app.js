import express from 'express'
import authRoute from './routes/auth.route.js'
import { errHdlrMDW } from './middlewares/errHdlr.mdw.js'
import { notFoundMDW } from './middlewares/notFound.mdw.js'
import cors from 'cors'
import postRoute from './routes/post.route.js'
import authenticate from './middlewares/authenticate.mdw.js'

const app = express()
app.use(express.json())
app.use(cors({
    origin: ["http://localhost:5173"], // allow origins
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true //allow cookies if needed
}))

app.use('/api/auth', authRoute)
app.use('/api/post', authenticate, postRoute)
app.use('/api/comment', (req,res)=>{ res.send('comment service')})
app.use('/api/like', (req,res)=>{ res.send('like service')})

app.use(notFoundMDW)
app.use(errHdlrMDW)

export default app