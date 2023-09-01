const router = require('express').Router();
const { BlogPost, Comment, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const blogPostData = await BlogPost.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Comment,
          attributes: ['text', 'date_created'],
          include: [
            {
              model: User,
              attributes: ['name']
            }
          ]
        },

      ],
    });

    // Serialize data so the template can read it
    const blogPosts = blogPostData.map((blogPost) => blogPost.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.json(blogPosts);
    // res.render('homepage', { 
    //   blogPosts, 
    //   logged_in: req.session.logged_in 
    // });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', withAuth, async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const blogPostData = await BlogPost.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Comment,
          attributes: ['text', 'date_created'],
          include: [
            {
              model: User,
              attributes: ['name']
            }
          ]
        },

      ],
    });

    // Serialize data so the template can read it
    const blogPost = blogPostData.get({ plain: true });

    // Pass serialized data and session flag into template
    res.json(blogPost);
    // res.render('homepage', { 
    //   blogPosts, 
    //   logged_in: req.session.logged_in 
    // });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req,res)=> {
  let result = await BlogPost.destroy({
      where: {id: req.params.id}
  })
  res.json(result)
  
})
// // Use withAuth middleware to prevent access to route
// router.get('/profile', withAuth, async (req, res) => {
//   try {
//     // Find the logged in user based on the session ID
//     const userData = await User.findByPk(req.session.user_id, {
//       attributes: { exclude: ['password'] },
//       include: [{ model: BlogPost }],
//     });

//     const user = userData.get({ plain: true });
//     res.json(user)
//     // res.render('profile', {
//     //   ...user,
//     //   logged_in: true
//     // });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// router.get('/login', (req, res) => {
//   // If the user is already logged in, redirect the request to another route
//   if (req.session.logged_in) {
//     res.redirect('/profile');
//     return;
//   }

//   res.render('login');
// });

module.exports = router;
