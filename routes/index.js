var express = require('express');
var router = express.Router();
var models = require('../models/index')
/* GET home page. */
router.get('/', function(req, res, next) {
  models.url.findAll({}).then(function(result){
    res.render('index', { title: 'h8 link shortener', list:result, type:0})
  })
});

router.post('/urls', function(req, res, next) {
  var random_text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

  for( var i=0; i < 5; i++ )
  {random_text += possible.charAt(Math.floor(Math.random() * possible.length))}
  models.url.create({
    name:random_text,
    link:'http://'+req.body.link,
    click_count:0
  }).then(function(){
    models.url.findAll({}).then(function(result){
    res.redirect('/')
    })
  })
});


router.get('/:short_url', function(req, res, next) {
  models.url.findAll({
    where: {
      name: req.params.short_url
    }
  }).then(function(result){
    if (result){
      var update_count = result[0].click_count + 1
      models.url.update({
        click_count: update_count
      }, {
        where:{
          id: result[0].id
        }
    }).then(function(){
      res.redirect(result[0].link)
    })
  } else { res.send('broken link')}
  })
});

module.exports = router;
