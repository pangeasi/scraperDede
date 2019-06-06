const express = require('express')
const request = require('request')
const cors = require('cors')
const { THEMOVIEDB_API_TOKEN } = require('../config')

const app = express()
app.use(cors())

app.get('*', async (req,res)=>{
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

module.exports = app

