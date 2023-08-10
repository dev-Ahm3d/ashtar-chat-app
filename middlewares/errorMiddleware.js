const globalError = (err,req,res,next)=>{
    //console.log(err)
    err.statusCode = err.statusCode || 500
    err.status = err.status || 'error'
    if(process.env.NODE_ENV === 'development') sendForDev(err,res)
    else sendForProd(err,res)
}

const sendForDev = (err,res) =>{
    return res.status(err.statusCode).json({
        error : err , 
        status : err.status , 
        message : err.message ,
        stack : err.stack        
    })
}

const sendForProd = (err,res) =>{
    return res.status(err.statusCode).json({
        status : err.status , 
        message : err.message ,
    })
}


module.exports = globalError 