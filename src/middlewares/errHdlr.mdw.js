import { ZodError } from "zod"

export function errHdlrMDW (err,req,res,next){
    if(err.name === ZodError){
        return res.status(400).json({
            success: false,
            errors: err.flatten().fieldErrors
            // errors: err.issues
            // errors: err.issues.map(err => err.message)
        })
    }

    console.log(err)
    res.status(err.status || 500)
    res.json({
        status: err.status || 500,
        meassage: err.message || 'Internal Server Error'
    })
}