import createHttpError from 'http-errors'

export function notFoundMDW (req,res,next){
    return next (createHttpError.NotFound())
}