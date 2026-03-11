import express from 'express'
import { getMeCtrl, logInCtrl, registerCtrl } from '../controllers/auth.controller.js'

const authRoute = express.Router()

authRoute.post('/register', registerCtrl)
authRoute.post('/login', logInCtrl)
authRoute.get('/me',getMeCtrl)

export default authRoute