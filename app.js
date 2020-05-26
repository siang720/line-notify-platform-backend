require('dotenv').config()
const express = require("express")
const db = require('./models')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 3000
const bodyParser = require('body-parser')
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const multer = require('multer')
const upload = multer()

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'LINE-Notify-Platform', // Title (required)
      version: '1.0.0', // Version (required)
    }
  },
  // Path to the API docs
  apis: ['./api-docs/swagger.yaml'],
};

// Initialize swagger-jsdoc -> returns validated swagger spec in json format
const swaggerSpec = swaggerJSDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// cors 的預設為全開放
app.use(cors())
// for parsing x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// for parsing application/json
app.use(bodyParser.json())
// for parsing multipart/form-data
app.use(upload.array());

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
})

require("./routes")(app);