"use-strict"

let express = require('express')
let app = express()
let bodyParser = require('body-parser')
let model = require('./models/index')
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

app.get('/:id', function(req,res,next){
  model.url.findAll({where: {id: req.params.id}}).then(function(result){
    let updateClick = result.click_count + 1
    model.url.update({click_count: updateClick},{where: {id: result.id}})
  })
})
