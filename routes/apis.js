const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

router.get('/init', (req, res) => {
  return res.json({ message: 'Project init' })
})

router.post('/signin', userController.signIn)
router.post('/signup', userController.signUp)

module.exports = router;