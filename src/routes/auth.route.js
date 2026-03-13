import express from 'express'
import { getMeCtrl, logInCtrl, registerCtrl } from '../controllers/auth.controller.js'
import authenticate from '../middlewares/authenticate.mdw.js'

const authRoute = express.Router()

authRoute.post('/register', registerCtrl)
authRoute.post('/login', logInCtrl)
authRoute.get('/me', authenticate, getMeCtrl)

export default authRoute