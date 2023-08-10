const asyncHandler = require('express-async-handler')
const ApiError = require('../utils/apiError')
const Application = require('../models/application.model')
const Chat = require('../models/chat.model')
const { Op } = require('sequelize')
const { cacheResponse } = require('../middlewares/redis')
const { pagination } = require('../tools/pagination')

exports.getChats = asyncHandler(async(req,res,next)=>{
    const {limit , offset} = pagination(req)
    const {token,number} = req.params
    const application = await Application.findOne({
        where : {
            token
        }
    })
    let whereClause = {
        application_id : application.dataValues.id
    }
    if(number) whereClause = {
        [Op.and] : [
            whereClause ,
            {number}
        ]
    }
    const {rows,count} = await Chat.findAndCountAll({
        where : whereClause ,
        attributes : {
            exclude : ["id","application_id"]
        },
        limit , 
        offset
    })
    const respData = {
        chats : rows , 
        count
    }
    //await cacheResponse(respData)
    res.status(200).json(respData)
})

exports.createChat = asyncHandler(async(req,res,next)=>{
    const {token} = req.params
    const {name} = req.body
    const application = await Application.findOne({
        where : {
            token
        }
    }) 
    const appChats = await Chat.findAndCountAll({
        where : {
            application_id : application.dataValues.id
        }
    })
    const newChat = await Chat.create({
        name,
        application_id : application.dataValues.id,
        number : appChats.count + 1
    })
    if(newChat) res.status(201).json({ 
        created : true , 
        chat_number : newChat.dataValues.number})
    else next(new ApiError('something went wrong !',400))
})



