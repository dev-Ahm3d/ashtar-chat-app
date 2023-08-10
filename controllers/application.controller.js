const asyncHandler = require('express-async-handler')
const Application = require('../models/application.model')
const ApiError = require('../utils/apiError')
const crypto = require('crypto')
const { cacheResponse } = require('../middlewares/redis')
const { pagination } = require('../tools/pagination')

const generateRandomSerial = length => {
    const randomBytes = crypto .randomBytes(length)
    const serial = randomBytes.toString('hex').substring(0, length)
    return serial
}

exports.getApplications = asyncHandler(async(req,res,next)=>{
    const {limit , offset} = pagination(req)
    let whereClause = {}
    const {token} = req.params
    if(token) whereClause = {token}
    const {rows,count} = await Application.findAndCountAll({
        where:whereClause , 
        attributes : {
            exclude : ["id"] 
        },
        limit , 
        offset
    })
    const respData = {
        applications : rows , 
        count
    }
    //await cacheResponse(req,respData)
    res.status(200).json(respData)
})

exports.createApplication = asyncHandler(async(req,res,next)=>{
    const {name} = req.body
    const token = generateRandomSerial(30)
    const newApplication = await Application.create({
        name , 
        token 
    })
    if(newApplication) res.status(201).json({ created : true , token })
    else next(new ApiError('something went wrong !',400))
})

