import createHttpError from 'http-errors'
import identityKeyCheck from '../utils/identity.util.js'
import {prisma} from '../libs/prisma.js'
import bcrypt from 'bcrypt'
import { loginSchema, registerSchema } from '../validations/schema.js'
import jwt from 'jsonwebtoken'
import { createUser, getUserBy } from '../services/user.service.js'

export async function registerCtrl(req,res,next) {
    const {identity, firstName, lastName, password, confirmPassword} = req.body

    //validation
    const data = await registerSchema.parseAsync(req.body)
    //check identity(email/phone)
    const identityKey = data.email ? 'email' : 'mobile'
    // const identityKey = identityKeyCheck(identity)
    // console.log(identityKey)
    // if(!identityKey) {
    //     return next(createHttpError[400]('It must be email or phone number'))
    // }

    //find user / user should be unique
    const foundUser = await getUserBy( identityKey, data[identityKey])
    // console.log(foundUser)
    if(foundUser) {
        return next(createHttpError[409]('This User has been registed'))
    }

    //create new users
    // const newUser = {
    //     [identityKey] : identity,
    //     password : await bcrypt.hash(password, 8),
    //     firstName : firstName,
    //     lastName : lastName
    // }
    // const createdUser = await prisma.user.create({ data: newUser})
    // const createdUser = await prisma.user.create({ data: data})
    const createdUser = await createUser(data)
    // console.log(createdUser)
    const userInfo = { 
        id : createdUser.id,
        [identityKey] : data.identity,
        firstName : createdUser.firstName,
        lastName : createdUser.lastName
    }

    res.json({
        message : 'Register Successfully',
        user: userInfo
    })
}


export async function logInCtrl(req,res,next) {
    const data = loginSchema.parse(req.body)
    const identityKey = data.email ? 'email' : 'mobile'
    //find this user
    // const foundUser = await prisma.user.findFirst({
    //     where : { [identityKey] : data[identityKey] }
    // })
    const foundUser = await getUserBy( identityKey, data[identityKey])
    if(!foundUser) {
        return next(createHttpError[401]('Invalid Login 1'))
    }

    //check password
    let pwOK = await bcrypt.compare(data.password, foundUser.password)
    if(!pwOK) {
        return next(createHttpError[401]('Invalid Login 2'))
    }

    //create token
    const payload = { id: foundUser.id }
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        algorithm: "HS256",
        expiresIn: "20d"
    })
    const { password, createdAt, updatedAt, ...userInfo } = foundUser

    res.json({
        message: 'Login done',
        token: token,
        user: userInfo
    })
}
export async function getMeCtrl(req,res,next) {
    console.log('In getme', req.user)
    res.json({ user : req.user})
}