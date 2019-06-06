
const express = require('express')
const request = require('request')
const cors = require('cors')
const { MASTODON_TOKEN } = require('../config')

const app = express()
app.use(cors())


const addAuthorizationHeader = () => {
    let headers= {}
    headers.Authorization = "Bearer " + MASTODON_TOKEN;
    return headers;
}

app.get('*', (req,res) => {
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


module.exports = app

