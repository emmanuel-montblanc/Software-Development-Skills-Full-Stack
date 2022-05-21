const express = require("express");
const router = express.Router();
const Article = require("../models/article");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const config = require("../config/database");

// Register
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

// Authenticate
// router.post("/authenticate", (req, res, next) => {
//   const username = req.body.username;
//   const password = req.body.password;

//   User.getUserByUsername(username, (err, user) => {
//     if (err) throw err;
//     if (!user) {
//       return res.json({ success: false, msg: "User not found" });
//     }

//     User.comparePassword(password, user.password, (err, isMatch) => {
//       if (err) throw err;
//       if (isMatch) {
//         const token = jwt.sign({ data: user }, config.secret, {
//           expiresIn: 604800, // 1week
//         });

//         res.json({
//           success: true,
//           token: "JWT " + token,
//           user: {
//             id: user.id,
//             name: user.name,
//             user: username,
//             email: user.email,
//           },
//         });
//       } else {
//         return res.json({ success: false, msg: "Wrong password" });
//       }
//     });
//   });
// });

// // Profile
// router.get(
//   "/profile",
//   passport.authenticate("jwt", { session: false }),
//   (req, res, next) => {
//     res.json({ user: req.user });
//   }
// );

module.exports = router;
