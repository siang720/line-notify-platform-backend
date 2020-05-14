const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const serviceController = require('../controllers/serviceController')
const notifyController = require('../controllers/notifyController')
const passport = require('../config/passport')
const authenticated = passport.authenticate('jwt', { session: false })

router.get('/init', authenticated, (req, res) => {
  return res.json({ message: 'Project init' })
})

router.post('/signin', userController.signIn)
router.post('/signup', userController.signUp)
router.get('/users/:id', authenticated, userController.getUser)
router.get('/get_current_user', authenticated, userController.getCurrentUser)
router.get('/services', authenticated, serviceController.getServices)
router.post('/services', authenticated, serviceController.postService)
router.put('/services/:id', authenticated, serviceController.putService)
router.delete('/services/:id', authenticated, serviceController.deleteService)
router.post('/historicalMessage', authenticated, notifyController.postHistoricalMessage)

module.exports = router;