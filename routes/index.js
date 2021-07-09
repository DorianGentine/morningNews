var express = require('express');
var router = express.Router();
const request = require('sync-request');
const UserModel = require('../models/users');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/load-sources/:token', async (req, res) => {
  const user = await UserModel.findOne({token: req.params.token})
  if(!user){
    res.json({result: false, error: 'No user found'})
  }else{
    const requete = request("GET", `https://newsapi.org/v2/sources?language=${user.language}&country=${user.country}&apiKey=${process.env.NEWS_API_KEY}`);
    const resultWS = JSON.parse(requete.body);
    res.json(resultWS)
  }
})

router.get('/load-article', async (req, res) => {
  const requete = request("GET", `https://newsapi.org/v2/top-headlines?sources=${req.query.id}&apiKey=${process.env.NEWS_API_KEY}`);
	const resultWS = JSON.parse(requete.body);
  res.json(resultWS)
})

module.exports = router;
