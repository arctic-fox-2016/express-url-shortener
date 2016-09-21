var express = require('express');
var router = express.Router();
var model = require("../models/index")



function makeid()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

/* GET home page. */
router.get('/', function(req, res, next) {
  var links = []
  model.Links.findAll().then(function(result){
    for (let idx in result){
      links.push(result[idx])
    }
    res.render('index',{data:links});
  })
})

router.post('/insert', function(req, res, next){
  model.Links.create({prelink: req.body.link,postlink:makeid()})
  res.redirect('/')
})

router.get('/:short_url', function(req, res, next){
  var short = req.params.short_url;
  var links = []
  model.Links.findAll({
  where: {
    postlink: short
    }
  }).then(function(result){
    console.log(`aaaaa : `+short);
    console.log(`aaaaa:` + result[0].prelink);

    var destination = 'http://' + result[0].prelink.replace('www.','')
    res.redirect(destination)
  })
})

module.exports = router;
