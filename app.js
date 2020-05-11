require('dotenv').config()
const express = require("express")
const db = require('./models')
const cors = require('cors')
const app = express()
const port = 3000
const bodyParser = require('body-parser')

// cors 的預設為全開放
app.use(cors())

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
})

require("./routes")(app);