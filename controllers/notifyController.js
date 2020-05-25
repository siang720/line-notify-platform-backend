const db = require('../models')
const Token = db.Token
const Service = db.Service
const HistoricalMessage = db.HistoricalMessage
const rp = require('request-promise')

function addNewChartData(arr) {
  arr.push({
    labels: [],
    datasets: [{
      label: '',
      backgroundColor: "#ffa600",
      data: []
    }]
  })
}

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
    }).then(async service => {
      // service has no token
      if (service.Tokens.length === 0) { return res.json({ status: 'error', message: 'This service has no token' }) }
      // use for-loop to send notify to every token
      let sendNum = 0
      let failNum = 0
      for (let i = 0; i < service.Tokens.length; i++) {
        await rp({
          method: 'POST',
          url: 'https://notify-api.line.me/api/notify',
          auth: {
            bearer: service.Tokens[i].access_token
          },
          form: {
            message: req.body.message
          },
          json: true
        }).then(res => {
          // 發送成功
          if (res.status === 200) {
            sendNum += 1
          }
        }).catch(err => {
          failNum += 1
        })
      }
      return [sendNum, failNum]
    }).then(result => {
      // save to historical data
      HistoricalMessage.create({
        message: req.body.message,
        sendTime: new Date(),
        ServiceId: req.body.serviceId,
        sendNum: result[0],
        UserId: req.user.id,
        failNum: result[1]
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
      order: [['createdAt', 'DESC']],
      include: [{ model: Service, attributes: ['name'] }]
    }).then(messages => {
      return res.json({ messages })
    })
  },
  getStatistic: (req, res) => {
    db.sequelize.query(
      `SELECT his.ServiceId, services.name as name, DATE(his.createdAt) as date, count(his.id) as notifies
FROM historicalmessages as his LEFT OUTER JOIN services as services
ON his.ServiceId = services.id
group by his.ServiceId, date`, { type: db.sequelize.QueryTypes.SELECT }
    ).then(results => {
      if (results === null) return res.json({ status: "success", message: 'no history message' })
      // init chartData array
      let chartData = []
      // init object
      let tmpServiceId = results[0].ServiceId
      let current = 0
      addNewChartData(chartData)
      chartData[current].datasets[0].label = results[0].name
      // iteration
      results.forEach(result => {
        if (result.ServiceId === tmpServiceId) {
          chartData[current].labels.push(result.date)
          chartData[current].datasets[0].data.push(result.notifies)
        } else {
          addNewChartData(chartData)
          current += 1
          tmpServiceId = result.ServiceId
          chartData[current].labels.push(result.date)
          chartData[current].datasets[0].label = result.name
          chartData[current].datasets[0].data.push(result.notifies)
        }
      });
      return res.json(chartData)
    })
  }
}

module.exports = notifyController