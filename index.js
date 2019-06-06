const express = require('express')
const request = require('request')
const cors = require('cors')
const { MASTODON_TOKEN, THEMOVIEDB_API_TOKEN, TELEGRAM_TOKEN, cookie, LOGIN_VERYSTREAM_API, KEY_VERYSTREAM_API} = require('./config')

const app = express()
app.use(cors())


const cookiesDixmax = () => cookie
const addAuthorizationHeader = () => {
    let headers= {}
    headers.Authorization = "Bearer " + MASTODON_TOKEN;
    return headers;
}
const replacer = () => {
    let from = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç", 
        to   = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc",
        mapping = {};
   
    for(let i = 0, j = from.length; i < j; i++ )
        mapping[ from.charAt( i ) ] = to.charAt( i );
   
    return function( str ) {
        let ret = [];
        for( let i = 0, j = str.length; i < j; i++ ) {
            let c = str.charAt( i );
            if( mapping.hasOwnProperty( str.charAt( i ) ) )
                ret.push( mapping[ c ] );
            else
                ret.push( c );
        }      
        return ret.join( '' );
    }
   
}
app.get('/search-api', (req,res) => {
    let formData = {
        q: `id${req.query.id} scraperdede`,
        following: 'true',
        limit: '999'
    }
    request({
        url: 'https://mastodon.host/api/v2/search',
        formData,
        headers: addAuthorizationHeader()
    }, (err, response, body) => {
        if (!err && response.statusCode == 200) {
            let info = body.includes('{') ? JSON.parse(body) : []
            let { statuses } = info
            let statusesFiltered = statuses.length > 0 ? statuses.filter(x => x.account.id === "411732") : []
            
            if(statuses.length > 0){
                request({
                    url: `https://mastodon.host/api/v1/statuses/${statusesFiltered[0].id}/context`,
                },(err,response,body) => {
                    if (!err && response.statusCode == 200) {
                        let info = body.includes('{') ? JSON.parse(body) : []
                        let { descendants } = info
                        let links = descendants.map(x => {
                            return {
                                link: x.card.url
                            }
                        })
                        
                        res.set('content-type', 'application/json')
                        res.status(200).send(links)
                    }
                })
            }else{
                res.set('content-type', 'application/json')
                res.status(200).send(statusesFiltered)
            }
          }
    })
})


app.get('/search', async (req,res)=>{

    

    const decodeTerm = replacer()(decodeURIComponent(req.query.term))
    const url = `https://api.themoviedb.org/3/search/multi?api_key=${THEMOVIEDB_API_TOKEN}&language=es-ES&query=${decodeTerm}&page=1&include_adult=false`
    
    
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

app.get('/search-seasons', async (req,res)=>{
    const url = `https://api.themoviedb.org/3/tv/${req.query.term}?api_key=${THEMOVIEDB_API_TOKEN}&language=es-ES`

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

app.get('/search-episodes', async (req,res)=>{
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

app.get('/msg4admin', async (req,res)=>{
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


app.get('/adede', (req, res) => {
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

app.get('/account', (req, res) => {

    request({
        url: `https://api.verystream.com/remotedl/status?login=${LOGIN_VERYSTREAM_API}&key=${KEY_VERYSTREAM_API}`,
        method: 'get'
    },(err,response,body) => {
        if (!err && response.statusCode == 200) {
            let info =  body.includes('{') ? JSON.parse(body) : []
            res.set('content-type', 'application/json')
            res.status(200).send(info)
          }
    })
})

app.listen(4000, () => console.log('listen on 4000'))

