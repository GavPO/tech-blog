const { Post, Comment, User } = require('../models');

const router = require('express').Router();

router.get('/', async (req, res) => {
    try {
        if (!req.session.loggedIn) {
            res.redirect('/login');
        } else {
            const userPosts = await Post.findAll({
                include: [
                    {
                        model: User,
                        attributes: ['username'],
                    },
                ],
                raw: true,
                nest: true,
            });
            console.log(userPosts);     
            res.render('homepage', { 
                userPosts, 
                loggedIn: req.session.loggedIn 
            });

        };
    } catch(err) {
        res.status(500).json(err);
    };
});



router.get('/login', async (req, res) => {
    res.render('logpage', { loggedIn: req.session.loggedIn })
});


module.exports = router;