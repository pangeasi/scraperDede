const express = require('express')
const request = require('request')
const cors = require('cors')
const { TELEGRAM_TOKEN } = require('../config')

const app = express()
app.use(cors())

app.get('*', async (req,res)=>{
    const decodeTerm = decodeURIComponent(req.query.msg)
    const message = encodeURIComponent(`mensaje: ${decodeTerm}`)

    request({
        url: `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage?chat_id=360762343&text=${message}`,
        method: 'get',
    },(err,response,body) => {
        if (!err && response.statusCode == 200) {
            let info = body.includes('{') ? JSON.parse(body) : []
            
            res.set('content-type', 'application/json')
            res.status(200).send({})
          }
    })
})

module.exports = app

