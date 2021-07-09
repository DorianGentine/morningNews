var express = require('express');
var router = express.Router();
const request = require('sync-request');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/load-sources', async (req, res) => {
  const requete = request("GET", `https://newsapi.org/v2/sources?language=${req.query.language}&country=${req.query.country}&apiKey=${process.env.NEWS_API_KEY}`);
	const resultWS = JSON.parse(requete.body);
  res.json(resultWS)
})

router.get('/load-article', async (req, res) => {
  const requete = request("GET", `https://newsapi.org/v2/top-headlines?sources=${req.query.id}&apiKey=${process.env.NEWS_API_KEY}`);
	const resultWS = JSON.parse(requete.body);
  res.json(resultWS)
})

module.exports = router;
