require('dotenv').config()
const express = require("express")
const db = require('./models')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const passport = require('./config/passport')

app.use(bodyParser.urlencoded({ extended: true }))

// setup passport
app.use(passport.initialize())
app.use(passport.session())

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
})

require("./routes")(app, passport);

// module.exports = app;