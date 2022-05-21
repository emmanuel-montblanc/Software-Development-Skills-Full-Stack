const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const config = require("../config/database");

// Article schema
const ArticleSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  bodytext: {
    type: String,
    required: true,
  },
  writer: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
  },
});

const Article = (module.exports = mongoose.model("Article", ArticleSchema));

module.exports.getArticleById = function (id, callback) {
  Article.findById(id, callback);
};

module.exports.getArticleByTitle = function (title, callback) {
  const query = { title: title };
  Article.findOne(query, callback);
};

module.exports.getAllArticles = function (callback) {
  Article.find(callback).sort({date: -1});
};

module.exports.addArticle = function (newArticle, callback) {
  newArticle.date = new Date();
  newArticle.save(callback);
};
