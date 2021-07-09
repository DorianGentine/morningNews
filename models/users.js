const mongoose = require('mongoose')

const articleSchema = mongoose.Schema({
  title: String,
  urlToImage: String,
  description: String,
  content: String,
  language :String,
});


const userSchema = mongoose.Schema({
  firstname: String,
  lastname: String,
  email: String,
  password: String,
  token: String,
  articles: [articleSchema],
  language: String,
  country: String,
});

const UserModel = mongoose.model('users', userSchema);

module.exports = UserModel