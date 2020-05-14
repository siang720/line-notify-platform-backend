let apis = require('./apis')
let routes = require('./routes')

module.exports = (app) => {
  app.use('/', routes)
  app.use('/api', apis)
}