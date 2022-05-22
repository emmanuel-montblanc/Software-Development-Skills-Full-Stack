const express = require("express");
const router = express.Router();
const Article = require("../models/article");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const config = require("../config/database");

// Write article
router.post("/write", (req, res, next) => {
  let newArticle = new Article({
    title: req.body.title,
    bodytext: req.body.bodytext,
    writer: req.body.writer,
  });

  Article.addArticle(newArticle, (err, article) => {
    if (err) {
      res.json({ success: false, msg: "Failed to write article" });
    } else {
      res.json({ success: true, msg: "article written" });
    }
  });
});


// Post a comment
router.post("/comment", (req, res, next) => {
  let newComment = {
    writer: req.body.writer,
    comment: req.body.comment
  };

  Article.getArticleById( req.body.id, (err, article) => {
    if(err) throw err;

    Article.addComment(article, newComment, (err, article) => {
      if (err) {
        res.json({ success: false, msg: "Failed to add comment" });
      } else {
        res.json({ success: true, msg: "comment added" });
      }
    });
  })
});

// Get all the articles
router.get("/getall", (req, res, next) => {
  Article.getAllArticles( (err, articleList) => {
    if(err) throw err;
    res.json({
      success: true,
      articleList: articleList
    });
  })
})

module.exports = router;
