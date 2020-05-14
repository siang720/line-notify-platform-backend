const express = require('express')
const router = express.Router()
const subscriptController = require('../controllers/subscriptController')

router.get('/services/:id/subscript', subscriptController.getSubscriptPage)
router.get('/services/:id/callback', subscriptController.getAccessToken)

module.exports = router;