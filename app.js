'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const routes = require('./routes/index')


let app = express()

app.set('views', path.join(__dirname,'views'))
app.set('view engine', 'ejs')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

app.use('/', routes)

app.listen(3000)
console.log('server is on!')

module.exports = app
