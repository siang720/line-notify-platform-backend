const express = require("express")
const db = require('./models')
const app = express()
const port = 3000

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
})

require("./routes")(app);

// module.exports = app;