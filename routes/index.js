const e = require('express');
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

router.post('/save-article/:token', async (req,res) => {
  //console.log( req.params);
  const user= await UserModel.findOne({token : req.params.token})

  if (!user) {
    res.json({result: false, error: 'no user found' })
  }else{
      user.articles.push({
        title: req.body.title,
        urlToImage: req.body.urlToImage,
        description: req.body.description,
        content: req.body.content,
        language: user.language,
      })
      //console.log(user);
      const userSaved= await user.save()
      //console.log(userSaved);
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


router.delete('/delete/:token/:title', async (req,res) => {
  const user = await UserModel.findOne({token : req.params.token});
  if (!user){
    res.json({result: false, error: 'no user found' })
  }else{
    console.log(req.params.title);
    const articles = user.articles.filter(e => e.title !== req.params.title  ) 
    console.log(articles);
    user.articles = articles
    //console.log(user);
    const usersaved = await user.save()
    //console.log(usersaved);
    res.json({result:true, articles: usersaved.articles})
  }
} )



module.exports = router;
