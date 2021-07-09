var express = require('express');
var router = express.Router();
const request = require('sync-request');
const UserModel = require('../models/users');

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

router.post('/save-article/:token', async (req,res) => {
  console.log( req.params);
  const user= await UserModel.findOne({token : req.params.token})

  if (!user) {
    res.json({result: false, error: 'no user found' })
  }else{
      user.articles.push({
        title: req.body.title,
        urlToImage: req.body.urlToImage,
        description: req.body.description,
        content: req.body.content,
      })
      console.log(user);
      const userSaved= await user.save()
      console.log(userSaved);
      res.json({result:true, user:{
        firstname:userSaved.firstname,
        token: userSaved.token,
        articles: userSaved.articles
      }})
  }
})

router.get('/my-articles/:token',  async (req,res) => {
  const user= await UserModel.findOne({token : req.params.token});
  if (!user){
    res.json({result: false, error: 'no user found' })
  }else{
    res.json({result: true, articles : user.articles });
  }
})
module.exports = router;
