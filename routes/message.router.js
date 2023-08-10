const { addNewMessage, getMessages } = require('../controllers/message.controller')
const { checkCache } = require('../middlewares/redis')

const router = require('express').Router()

router
.route('/applications/:token/chats/:number/messages')
.get(getMessages)
.post(addNewMessage)


module.exports = router