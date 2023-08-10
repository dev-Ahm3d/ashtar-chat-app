const { createApplication, getApplications } = require('../controllers/application.controller')
const { checkCache } = require('../middlewares/redis')

const router = require('express').Router()

router
.route('/applications')
.get(getApplications)
.post(createApplication)


module.exports = router