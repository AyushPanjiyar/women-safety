const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { redirect } = require("express/lib/response");
const ejs = require("ejs");
const homeStartingContent =
  "Every year, March 8 is celebrated as International Women's Day. This year, the goal is to create a gender-equal world. It is about celebrating a woman's success and raising awareness against bias. So we all should choose to challenge to bring the change. The hashtags for this year are #ChooseToChallenge and #IWD2022 . Several missions have been created to do the same. We should celebrate tech women and their innovations, applaud equality for women in sport, educate women on health choice decisions, build inclusive thriving workplaces, increase the visibility of creative women and forge their empowerment worldwide.";

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("css"));

mongoose.connect("mongodb://127.0.0.1:27017/proherDB");

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

const postSchema = {
  title: String,
  content: String,
};

const Post = mongoose.model("Post", postSchema);

const joinSchema = new mongoose.Schema({
  name: String,
  Email: String,
  address: String,
  profession: String,
});

const member = mongoose.model("member", joinSchema);

app.get("/", function (req, res) {
  res.render("index");
});

app.get("/joinus", function (req, res) {
  res.render("joinus");
});
app.post("/", function (req, res) {
  const emailU = req.body.email;
  const passU = req.body.pass;
  // console.log(email)
  // console.log(pass)
  const newuser = new User({
    email: emailU,
    password: passU,
  });
  newuser.save(function (err) {
    if (err) {
      console.log(err);
    } else {
      res.render("thankyou");
    }
  });

  // res.redirect("/");
});

app.get("/blog", function (req, res) {
  Post.find({}, function (err, posts) {
    res.render("blog", {
      startingContent: homeStartingContent,
      posts: posts,
    });
  });
});
app.get("/compose", function (req, res) {
  res.render("compose");
});

app.get("/collab", function (req, res) {
  res.render("collab");
});
app.get("/map", function (req, res) {
  res.render("map");
});

app.post("/compose", function (req, res) {
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody,
  });

  post.save(function (err) {
    if (!err) {
      res.redirect("/blog");
    }
  });
});

app.get("/aboutus", function (req, res) {
  res.render("aboutus");
});
// app.get("/thankyou", function (req, res) {
//   res.render("thankyou");
// });

app.post("/joinus", function (req, res) {
  const name = req.body.Namej;
  const email = req.body.Emailj;
  const message = req.body.Messagej;
  const profession = req.body.professionj;

  const Member = new member({
    name: name,
    Email: email,
    address: message,
    profession: profession,
  });
  Member.save(function (err) {
    if (err) {
      console.log(err);
    } else {
      res.render("thankyou");
    }
  });

  // res.redirect("/joinus")
});
app.listen(3000, function (req, res) {
  console.log("server sucessfully started in 3000");
});
