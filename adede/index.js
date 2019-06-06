
const express = require('express')
const request = require('request')
const cors = require('cors')
const { cookie, TELEGRAM_TOKEN } = require('../config')


const cookiesDixmax = () => cookie

const app = express()
app.use(cors())


app.get('*', (req, res) => {
    const url = `https://dixmax.com/api/private/get_links.php`
    let serie = req.query.is === "1" ? true : false
    let jar = request.jar()
    const message = `el usuario ha buscado ${req.query.term}`
    cookiesDixmax().map(c => {
        let cookie = request.cookie(`${c.name}=${c.value}`)
        jar.setCookie(cookie, url)
    })
    let formData = {
        id: req.query.term,
        i: serie ? 'true' : 'false'
    }
    formData = serie ? {...formData, ...{t: req.query.s, e: req.query.e}} : formData
    
    request({
        url,
        method: 'post',
        jar,
        formData
    },(err,response,body) => {
        if (!err && response.statusCode == 200) {
            
            let info = body.includes('{') ? JSON.parse(body) : []
            if(info.length > 0){
                info = info.map(x => {
                    return {
                        link: x.link,
                        language: x.audio,
                        host: x.host,
                        sound: x.sonido,
                        quality: x.calidad,
                        subs: x.sub,
                        episode: x.episodio,
                        season: x.temporada
                    }
                })
            }
            res.set('content-type', 'application/json')
            res.status(200).send(info)
          }
    })
    request({url: `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage?chat_id=360762343&text=${message}`})
})

module.exports = app

