const router = require('express').Router();
const { BlogPost, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all blog posts and JOIN with user/comment data
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

    const blogPosts = blogPostData.map((blogPost) => blogPost.get({ plain: true }));

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

    const blogPost = blogPostData.get({ plain: true });

    res.json(blogPost);
    // res.render('homepage', { 
    //   blogPosts, 
    //   logged_in: req.session.logged_in 
    // });
  } catch (err) {
    res.status(500).json(err);
  }
});


router.post('/', withAuth, async (req, res) => {
  try {
    const newBlogPost = await BlogPost.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newBlogPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', withAuth, async (req, res) => {
  // update product data
  try {
    const updatedBlogPost = await BlogPost.update(req.body, {
      where: {
        id: req.params.id,
      },
    })
    if (req.body.title && req.body.text) {

      updatedBlogPost.title = req.body.title;
        updatedBlogPost.text = req.body.text;
        updatedBlogPost.date_created = DataTypes.NOW;
  
     } else {
      res
        .status(400)
        .json({ message: 'Please enter a title and text!' });
      return;
    }
  } catch (err) {
    res.status(400).json(err);

  }
})

router.delete('/:id', withAuth, async (req, res) => {
  try {
    let blogPostData = await BlogPost.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      }
    })

    if (!blogPostData) {
      res.status(404).json({ message: 'No blog post found with this id!' });
      return;
    }

    res.status(200).json(blogPostData)
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
