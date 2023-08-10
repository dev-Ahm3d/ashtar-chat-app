const { createChat, getChats } = require('../controllers/chat.controller')
const { checkCache } = require('../middlewares/redis')

const router = require('express').Router()

router
.route('/applications/:token/chats')
.get(getChats)
.post(createChat)

router.get('/applications/:token/chats/:number' , getChats)

module.exports = router