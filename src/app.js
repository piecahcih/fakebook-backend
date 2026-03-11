import express from 'express'
import authRoute from './routes/auth.route.js'
import { errHdlrMDW } from './middlewares/errHdlr.mdw.js'
import { notFoundMDW } from './middlewares/notFound.mdw.js'

const app = express()
app.use(express.json())

app.use('/api/auth', authRoute)
app.use('/api/post', (req,res)=>{ res.send('post service')})
app.use('/api/comment', (req,res)=>{ res.send('comment service')})
app.use('/api/like', (req,res)=>{ res.send('like service')})

app.use(notFoundMDW)
app.use(errHdlrMDW)

export default app