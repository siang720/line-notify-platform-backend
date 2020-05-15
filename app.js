require('dotenv').config()
const express = require("express")
const db = require('./models')
const cors = require('cors')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    swagger: '2.0', // Specification (optional, defaults to swagger: '2.0')
    info: {
      title: 'LINE-Notify-Platform', // Title (required)
      version: '1.0.0', // Version (required)
    },
  },
  // Path to the API docs
  apis: ['./api-docs/swagger.yaml'],
};

// Initialize swagger-jsdoc -> returns validated swagger spec in json format
const swaggerSpec = swaggerJSDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// cors 的預設為全開放
app.use(cors())

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
})

require("./routes")(app);