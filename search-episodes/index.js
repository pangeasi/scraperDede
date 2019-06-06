const express = require('express')
const request = require('request')
const cors = require('cors')
const { THEMOVIEDB_API_TOKEN } = require('../config')

const app = express()
app.use(cors())

app.get('*', async (req,res)=>{
    const url = `https://api.themoviedb.org/3/tv/${req.query.id}/season/${req.query.s}?api_key=${THEMOVIEDB_API_TOKEN}&language=es-ES`

    request({
        url,
        method: 'get',
    },(err,response,body) => {
        if (!err && response.statusCode == 200) {
            let info = body.includes('{') ? JSON.parse(body) : []
            
            res.set('content-type', 'application/json')
            res.status(200).send(info)
          }
    })
})

module.exports = app

