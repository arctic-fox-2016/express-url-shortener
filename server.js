"use-strict"

var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var model = require('./models/index')
app.use(bodyParser.urlencoded({extended: true}))

app.listen(3000)
app.set('view-engine', 'ejs')

app.get('/', function(req,res,next){
  model.url.findAll().then(function(urls){
    if(urls){
      res.render('./index.ejs',{word: urls})
    } else {
      res.render('./index.ejs')
    }
  })
})

app.post('/urls', function(req,res,next){
  model.url.create({name: req.body.url, click_count:0}).then(function(){
    res.redirect("/")
  })
})

app.get('/red/:id', function(req,res,next){
  model.url.findAll({where: {id: req.params.id}}).then(function(result){
    var updateClick = result[0].click_count + 1
    model.url.update({click_count: updateClick},{where: {id: result[0].id}}).then(function(){
      res.redirect(result[0].name)
    })
  })
})

//
