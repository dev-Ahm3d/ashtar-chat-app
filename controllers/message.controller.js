const asyncHandler = require('express-async-handler')
const ApiError = require('../utils/apiError')
const Message = require('../models/message.model')
const Chat = require('../models/chat.model')
const { Op } = require('sequelize')
const Application = require('../models/application.model')
const { cacheResponse } = require('../middlewares/redis')
const { pagination } = require('../tools/pagination')


const checkChatInApp = async (appToken=0,chatNum=0)=>{
    const application = await Application.findOne({
        where : {token:appToken}
    })
    const chat =  await Chat.findOne({
        where : {
            [Op.and] : [
                {number:chatNum} ,
                {application_id : application.dataValues.id}
            ]
        }
    }) 
    if(chat) return chat.dataValues.id
    return 0
}

exports.getMessages = asyncHandler(async(req,res,next)=>{
    const {limit , offset} = pagination(req)
    const {token,number} = req.params
    const searchMsg = req.query.search
    const chatId = await checkChatInApp(token,number)
    let whereClause = {
        chat_id : chatId
    }
    if(searchMsg) whereClause = {
        [Op.and] : [
            whereClause ,
            {
                body : {
                    [Op.like] : `%${searchMsg}%`
                }
            }
        ]
    }
    const {rows,count} = await Message.findAndCountAll({
        where : whereClause ,
        attributes : {
            exclude : ["id","chat_id"]
        },
        limit ,
        offset
    })
    const respData = {
        messages : rows , 
        count
    }
    //await cacheResponse(respData)
    res.status(200).json(respData)
})

exports.addNewMessage = asyncHandler(async(req,res,next)=>{
    const {token,number} = req.params
    const {body} = req.body 
    const chatId = await checkChatInApp(token,number)
    const chatMessages = await Message.findAndCountAll({
        where : {
            chat_id : chatId
        }
    })
    const newMessage = await Message.create({
        body : body,
        chat_id : chatId , 
        number : chatMessages.count + 1
    })
    res.status(201).json({ 
        created : true , 
        message_number:newMessage.dataValues.number
    })
})


