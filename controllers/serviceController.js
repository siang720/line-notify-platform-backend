const db = require('../models')
const Service = db.Service
const Token = db.Token
const HistoricalMessage = db.HistoricalMessage
const Sequelize = require('sequelize')

const serviceController = {
  getServices: (req, res) => {
    return Service.findAll({
      where: {
        UserId: req.user.id
      },
      include: [
        { model: Token }
      ]
    }).then(services => {
      return res.json({ services })
    })
  },
  postService: (req, res) => {
    if (!req.body.name || !req.body.clientId || !req.body.clientSecret) {
      return res.json({ status: 'error', message: 'name/clientId/clientSecret didn\'t exist' })
    } else {
      return Service.create({
        name: req.body.name,
        clientId: req.body.clientId,
        clientSecret: req.body.clientSecret,
        UserId: req.user.id,
        subscriptURL: req.body.subscriptURL,
        callbackURL: req.body.callbackURL
      }).then(() => {
        res.json({ status: 'success', message: 'service was successfully created' })
      })
    }
  },
  putService: (req, res) => {
    if (!req.body.name || !req.body.clientId || !req.body.clientSecret) {
      return res.json({ status: 'error', message: 'name/clientId/clientSecret didn\'t exist' })
    } else {
      return Service.findByPk(req.params.id).then(service =>
        service.update({
          name: req.body.name,
          clientId: req.body.clientId,
          clientSecret: req.body.clientSecret
        }).then(service => {
          return res.json({ status: 'success', message: 'service was successfully update' })
        })
      )
    }
  },
  deleteService: (req, res) => {
    return Service.findByPk(req.params.id, {
      include: [Token, HistoricalMessage]
    }).then(service => {
      service.Tokens.map(token => {
        token.destroy()
      })
      service.HistoricalMessages.map(historicalMessage => {
        historicalMessage.destroy()
      })
      service.destroy().then(() => {
        return res.json({ status: 'success', message: 'service was successfully deleted' })
      })
    })
  }
}

module.exports = serviceController