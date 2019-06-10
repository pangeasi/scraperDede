
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
                    if (x.link.includes('openload')
                        || x.link.includes('verystream')
                        || x.link.includes('streamango')
                        || x.link.includes('vidoza')
                        || x.link.includes('streamcherry')
                        || x.link.includes('flix555')
                        || x.link.includes('streamplay')
                        || x.link.includes('clipwatching')
                        || x.link.includes('streamcloud')
                        || x.link.includes('flashx')
                        || x.link.includes('powvideo')
                        || x.link.includes('gamovideo')) {

                        results.push(new Promise((resolve, reject) => {
                            request(x.link, (error, response, body) => {

                                if (error) reject(error)
                                let $ = cheerio.load(body)
                                let statusText = $('.content-blocked > h3').text()

                                let status = statusText === 'We’re Sorry!'
                                    || statusText === 'File not found! Much sorry!'
                                    || $('h1').text() === 'Sorry!'
                                    || $('.text-center').text().includes('Reason for deletion:')
                                    || $('#container').text().includes('Reason for deletion:')
                                    || $('.container').text().includes('File Not Found')
                                    || $('div > img').attr('alt') === '404 File not found!'
                                    || $('h1').text() === 'File Not Found'
                                    || $('center').text().includes('File Not Found')
                                    || $('body').text().includes('File Not Found')
                                    || $('#cuerpo').text().includes('Copyright Infringement')
                                    || $('body').text().includes('Forbidden')

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

