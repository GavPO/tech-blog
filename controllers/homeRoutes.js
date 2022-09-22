const { Post, Comment, User } = require("../models");

const router = require("express").Router();

router.get("/", async (req, res) => {
  try {
    const userPosts = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
      raw: true,
      nest: true,
    });
    res.render("homepage", { userPosts });
  } catch (err) {}
});

router.get("/dashboard", async (req, res) => {
  try {
    if (!req.session.loggedIn) {
      console.log(req.session.loggedIn);
      res.redirect("/login");
    } else {
      res.render("dashboard");
      console.log(req.session.loggedIn);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", async (req, res) => {
  res.render("login");
});

router.get("/logout", async (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
