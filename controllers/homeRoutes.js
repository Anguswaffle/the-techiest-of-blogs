const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

// Loads homepage
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['name']
        },
      ],
    });

    const posts = postData.map(post => post.get({ plain: true }))

    res.render('homepage', {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
})

router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Comment,
          attributes: ['content'],
          include: {
            model: User,
            attributes: ['name'],
          },
        },
      ]
    });

    const post = postData.get({ plain: true });
    console.log(post);
    console.log(post.comments[0].user.name);

    res.render('post', {
      ...post,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Post }]
    })

    const user = userData.get({ plain: true });

    res.render('dashboard', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
})

router.get('/login', async (req, res) => {
  // If user is logged in then redirects to dashboard page
  try {


    if (req.session.logged_in) {
      res.redirect('/dashboard');
      return;
    }

    //Otherwise login page is rendered
    res.render('login');
  } catch (err) {
    res.status(400).json(err)
  }
})

module.exports = router;