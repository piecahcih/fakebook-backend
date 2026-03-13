import {z} from "zod";
import bcrypt from 'bcrypt';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const mobileRegex = /^[0-9]{10,15}$/

const identityKey = val => emailRegex.test(val) ? 'email' : 'mobile'

export const registerSchema = z.object({
    identity : z.string().min(2, "must have morethan 2 characters")
    .refine( val =>  emailRegex.test(val) || mobileRegex.test(val), "Email or mobile phone require"),
    firstName : z.string().min(2, "firstname is require"),
    lastName : z.string().min(2, "lastname is require"),
    password : z.string().min(2, "password must be morethan 4 characters"),
    confirmPassword : z.string().min(1, "confirm password is required"),
}).refine( input => input.password === input.confirmPassword, {
    message: "password must match with confirm password",
    path : ["password"]
}).transform( async data => ({
    [identityKey(data.identity)]: data.identity,
    password: await bcrypt.hash(data.password, 8),
    firstName: data.firstName,
    lastName: data.lastName,
}))
// }).transform( async data => {
//     // console.log('In transform:', data)
//     const output = {
//         [identityKey(data.identity)] : data.identity,
//         firstName : data.firstName,
//         lastName : data.lastName,
//         password : await bcrypt.hash(data.password, 8)
//     }
//     return output
// })



// const testUser = {
//     identity : "andy",
//     firstName : "a",
//     lastName : "cc22",
//     password : "1",
//     confirmPassword : "1234567"
// }
// try {
//     const result = registerSchema.parse(testUser)
//     console.log(result)
// } catch (error) {
//     console.log('Validation Error')
//     console.log(error.flatten())
//     // console.log(error.flatten().fieldErrors)
// }

export const loginSchema = z.object({
  identity: z.string().min(2, "Email or phone-number require")
     .refine(value => emailRegex.test(value) || mobileRegex.test(value), {
        message: "identity must be a valid email or mobile number"
     }),
  password: z.string().min(4, "password at least 4 characters")
}).transform(data => ({
     [identityKey(data.identity)]: data.identity,
     password: data.password
  })
)
