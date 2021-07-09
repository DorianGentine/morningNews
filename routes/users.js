var express = require('express');
var router = express.Router();
const uid2 = require('uid2')
const bcrypt = require('bcrypt')
const UserModel = require('../models/users');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/sign-in', async (req, res) => {
  if(req.body.email && req.body.password){
    const user = await UserModel.findOne({email: req.body.email})
    if(!user){
      res.json({result:false, error: "Le mot de passe ou le mail sont incorrects"})
    }else{
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.json({ result: true, user:{
          firstname: user.firstname,
          token: user.token,
          articles: user.articles
        } });
      } else {
        res.json({ result: false, error: "Le mot de passe ou le mail sont incorrects" });
      }
    }
  }else{
    res.json({result: false, error: "Merci de renseigner tous les champs"})
  }
})


router.post('/sign-up', async (req, res) => {
  if(req.body.firstname && req.body.lastname && req.body.email && req.body.password){
    const check = await UserModel.find({ email: req.body.email })
    if(check.length !== 0){
      res.json({result: false, error: "Cet email est déjà pris !"})
    }else{
      const newUser = new UserModel({...req.body})
      const hash = bcrypt.hashSync(req.body.password, 10);
      newUser.password = hash
      newUser.token = uid2(32)
      console.log(`newUser`, newUser)
      const userSaved = await newUser.save()
      res.json({result: true, user: {
        firstname: userSaved.firstname,
        token: userSaved.token,
        articles: user.articles
      }})
    }
  }else{
    res.json({result: false, error: "Merci de renseigner tous les champs"})
  }
})

module.exports = router;
