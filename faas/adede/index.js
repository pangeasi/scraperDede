
const utils = require('../../utils/validators')
const express = require('express')
const request = require('request')
const cors = require('cors')
const cheerio = require('cheerio')
const cfg = require('../../config')


const cookiesDixmax = () => cfg.cookie

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
    formData = serie ? { ...formData, ...{ t: req.query.s, e: req.query.e } } : formData

    request({
        url,
        method: 'post',
        jar,
        formData
    }, async(err, response, body) => {
        if (!err && response.statusCode == 200) {
            let info = body.includes('{') ? JSON.parse(body) : []
            const results = []

            if(info.length > 0){
                for (const x of info) {
                    if (utils.validServer(x)) {
                        results.push(new Promise((resolve, reject) => {
                            request(x.link, (error, response, body) => {
                                error && reject(error)
                                let $ = cheerio.load(body)
                                const status = utils.checkStatus($)

                                resolve({
                                    link: x.link,
                                    language: x.audio,
                                    host: x.host,
                                    sound: x.sonido,
                                    quality: x.calidad,
                                    subs: x.sub,
                                    episode: x.episodio,
                                    season: x.temporada,
                                    status: status ? 300 : 200
                                })
                            })
                        }))
                    }
                }
            }
            res.set('content-type', 'application/json')
            res.status(200).send(await Promise.all(results))
          }
    })
    request({ url: `https://api.telegram.org/bot${cfg.TELEGRAM_TOKEN}/sendMessage?chat_id=360762343&text=${message}` })
})

module.exports = app

