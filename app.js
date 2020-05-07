const express = require("express")
const db = require('./models')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
require('dotenv').config()

app.use(bodyParser.urlencoded({ extended: true }))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
})

require("./routes")(app);

// module.exports = app;