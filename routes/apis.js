const express = require('express')
const router = express.Router()

router.get('/init', (req, res) => {
  return res.json({ message: 'Project init' })
})

module.exports = router;