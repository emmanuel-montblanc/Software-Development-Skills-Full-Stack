const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const config = require("../config/database");

// Article schema
const ArticleSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
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
      type: Date
  }
});

const Article = (module.exports = mongoose.model("Article", ArticleSchema));

module.exports.getArticleById = function (id, callback) {
  Article.findById(id, callback);
};

module.exports.getArticleByTitle = function(title, callback) {
    const query = {title: title}
    Article.findOne(query, callback);
  }

module.exports.addArticle = function (newArticle, callback) {
    newArticle.date = Date.now();
    newArticle.save(callback);
};