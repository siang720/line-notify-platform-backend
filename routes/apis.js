const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const passport = require('../config/passport')
const authenticated = passport.authenticate('jwt', { session: false })

router.get('/init', authenticated, (req, res) => {
  return res.json({ message: 'Project init' })
})

router.post('/signin', userController.signIn)
router.post('/signup', userController.signUp)
router.get('/users/:id', authenticated, userController.getUser)
router.get('/get_current_user', authenticated, userController.getCurrentUser)

module.exports = router;