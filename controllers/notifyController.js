const db = require('../models')
const Token = db.Token
const Service = db.Service
const HistoricalMessage = db.HistoricalMessage
const rp = require('request-promise')

const notifyController = {
  // 發送訊息，同時建立歷史訊息
  postHistoricalMessage: (req, res) => {
    // 如果資料不足則顯示錯誤訊息
    if (!req.body.serviceId || !req.body.message) {
      return res.json({ status: 'error', message: 'serviceId or message didn\'t exist' })
    }
    // 發送訊息
    Service.findByPk(req.body.serviceId, {
      include: [{ model: Token, attributes: ['access_token'] }]
    }).then(service => {
      // service has no token
      if (service.Tokens.length === 0) { return res.json({ status: 'error', message: 'This service has no token' }) }
      // use for-loop to send notify to every token
      let sendNum = 0
      for (let i = 0; i < service.Tokens.length; i++) {
        rp({
          method: 'POST',
          url: 'https://notify-api.line.me/api/notify',
          auth: {
            bearer: service.Tokens[i].access_token
          },
          form: {
            message: req.body.message
          },
          json: true
        })
        sendNum += 1
      }
      return sendNum
    }).then(sendNum => {
      // save to historical data
      HistoricalMessage.create({
        message: req.body.message,
        sendTime: new Date(),
        ServiceId: req.body.serviceId,
        sendNum: sendNum,
        UserId: req.user.id
      })
      // return status
      return res.json({ status: 'success', message: 'server had send notify to every token' })
    })
  },
  getHistoricalMessage: (req, res) => {
    HistoricalMessage.findAll({
      where: {
        UserId: req.user.id
      },
      include: [{ model: Service, attributes: ['name'] }]
    }).then(messages => {
      return res.json(messages)
    })
  }
}

module.exports = notifyController