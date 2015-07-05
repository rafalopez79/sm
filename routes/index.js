var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { locale: res.getLocale(), title: 'smgreen', errors:[] });
});


module.exports = router;