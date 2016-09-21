const express = require('express')
const router = express.Router()
let models = require('../models');
let helper = require('../helper/utils.js')

router.get('/', function (req, res, next){
  res.render('index',{title:'Input your URL to be shortened', new_url: ''})
})

router.post('/short_url', function(req, res, next) {
  var url = req.body.input_url
  //models.urls.create()
  let hasil = helper.randomShort();
  models.urls.create({
    short: hasil,
    long: url
  }).then(function(urls) {
    res.render('index', {title:'Input your URL to be shortened', new_url: 'Your short URL is: ' + urls.short})
  });

})

router.get('/urls', function (req, res) {
  models.urls.findAll({}).then(function(result){
    res.render('list_urls', {title:'List of All Shortened URL', url_db:result})
  })
})

router.get('/url/:short_url', function (req, res, next) {
  models.urls.find({
    where: {
      short: req.params.short_url
    }
  }).then( function(result) {
    //res.redirect(result);
    res.render('redirect', {title:'Click the long URL', container:result})
  })


})

module.exports = router
