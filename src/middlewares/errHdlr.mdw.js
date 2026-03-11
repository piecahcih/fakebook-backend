export function errHdlrMDW (err,req,res,next){
    console.log(err)
    res.status(err.status || 500)
    res.json({
        status: err.status || 500,
        meassage: err.message || 'Internal Server Error'
    })
}