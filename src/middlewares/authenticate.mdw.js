import createHttpError from 'http-errors'
import { getUserBy } from '../services/user.service.js'
import jwt from 'jsonwebtoken'
import {prisma} from '../libs/prisma.js'

export default async function authenticate(req,res,next){
    const authorization = req.headers.authorization
    console.log(authorization)
    if(!authorization || !authorization.startsWith('Bearer ')) {
        return next (createHttpError[401]('Unauthorized 1'))
    }

    // get token
    const token = authorization.split(' ')[1]
    if(!token) { throw(createHttpError[401]('Unauthorized 2'))}

    //verify token
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    // console.log(payload)

    //เอาpayloadไปหาuser
    const foundUser = await prisma.user.findUnique({
        where: { id: payload.id}
    })
    if(!foundUser) {
        return next(createHttpError[401]('Unauthorized 3'))
    }
    // console.log(foundUser)
    // const foundUser = await getUserBy('id', payload.id)
    // if(!foundUser) {
        //     throw(createHttpError[401]('Unauthorized 3'))
        // }
        
        
    //create userData that have no key: password, createdAt, updatedAt
    const {password, createdAt, updatedAt, ...userData} = foundUser
    req.user = userData
    // console.log('usdt',userData)

    next()
}