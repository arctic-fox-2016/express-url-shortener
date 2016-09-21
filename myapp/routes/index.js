var express = require('express');
var router = express.Router();
let models = require('../models')

/* GET home page. */
router.get('/', function(req, res, next) {
  models.urls.findAll().then(function(data) {
    res.render('index', {
      data: data
    });
  });
});

router.post('/urls', function(req, res) {
  generateShortUrl(function(shortUrl) {
    models.urls.create({
      long_url: req.body.long_url,
      short_url: shortUrl,
      click_count: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    }).then(function(new_url) {
      models.urls.findAll().then(function(data) {
        res.render('index', {
          new_url: new_url,
          data: data
        });
      });
    })
  })
});

router.get('/:short_url', function(req, res, next) {
  models.urls.find({
    where: {
      short_url: req.url
    }
  }).then(function(data) {
    data.updateAttributes({
      click_count: data.dataValues.click_count + 1
    }).then(function(data) {
      res.redirect("https://" + data.dataValues.long_url)
    })
  });
});

let generateShortUrl = (callback) => {
  let shortUrl = "/"
  for (let i = 0; i < 6; i++) {
    shortUrl += String.fromCharCode(64 + Math.ceil(Math.random() * 26)).toLowerCase()
  }

  models.urls.find({
    where: {
      short_url: shortUrl
    }
  }).then(function(data) {
    if (data != null) {
      generateShortUrl()
    } else {
      callback(shortUrl)
    }
  })
}

module.exports = router;
