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
      order: [['updatedAt', 'DESC']],
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
        subscriptURL: "",
        callbackURL: ""
      }).then(service => {
        Service.findByPk(service.id).then(service => {
          service.update({
            subscriptURL: `https://notify-bot.line.me/oauth/authorize?response_type=code&client_id=${service.clientId}&redirect_uri=${process.env.baseURL}/services/${service.id}/callback&scope=notify&state=state`,
            callbackURL: `${process.env.baseURL}/services/${service.id}/callback`
          }).then(service => {
            res.json({ status: 'success', message: 'service was successfully created', serviceId: service.id, subscriptURL: service.subscriptURL, callbackURL: service.callbackURL })
          })
        })
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
          clientSecret: req.body.clientSecret,
          subscriptURL: `https://notify-bot.line.me/oauth/authorize?response_type=code&client_id=${req.body.clientId}&redirect_uri=${process.env.baseURL}/services/${service.id}/callback&scope=notify&state=state`
        }).then(service => {
          return res.json({ status: 'success', message: 'service was successfully update', subscriptURL: service.subscriptURL })
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
    }).catch(error => {
      return res.json({ status: 'error', message: 'fail to delete service' })
    })
  },
  getServicesSnapshot: (req, res) => {
    db.sequelize.query(`select Services.Id, services.name, count(tokens.id) tokenNums
from services 
LEFT OUTER JOIN tokens ON services.id = tokens.ServiceId
group by services.Id`, { type: db.sequelize.QueryTypes.SELECT }).then(results => {
      return res.json(results)
    })
  }
}

module.exports = serviceController
