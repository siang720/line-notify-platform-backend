const db = require('../models')
const Service = db.Service
const Token = db.Token
const rp = require('request-promise')

const subscriptController = {
  getSubscriptPage: (req, res) => {
    Service.findByPk(req.params.id).then(service => {
      return res.redirect(service.subscriptURL)
    })
  },
  getAccessToken: (req, res) => {
    Service.findByPk(req.params.id).then(async service => {
      // 取得access_token
      const oauthToken = await rp({
        method: 'POST',
        uri: `https://notify-bot.line.me/oauth/token?grant_type=authorization_code&code=${req.query.code}&redirect_uri=${service.callbackURL}&client_id=${service.clientId}&client_secret=${service.clientSecret}`,
        json: true
      })
      // 儲存access_token
      Token.create({
        access_token: oauthToken.access_token,
        ServiceId: req.params.id
      }).then(token => {
        return rp({
          method: 'POST',
          url: 'https://notify-api.line.me/api/notify',
          auth: {
            bearer: token.access_token
          },
          form: {
            message: '恭喜您成功訂閱AI投資小幫手，有任何重要訊息會立刻通知您'
          },
          json: true
        }).then(
          res.redirect("https://notify-bot.line.me/my/")
        )
      })
    })
  }
}

module.exports = subscriptController