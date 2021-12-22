const express = require('express');
const Category = require('../models/Category');
const Course = require('../models/Course');
const router = express.Router();

router.get('/create', (req, res) => {
  res.render('categories/create');
});
router.post('/', async (req, res) => {
  const { name } = req.body;
  const category = new Category({ name });
  await category.save();

  res.redirect(`/categories/${category.id}`);
});
router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    const courses = await Course.find({ category: req.params.id });
    if (category) {
      res.render('categories/single', { category, courses });
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    res.sendStatus(500);
  }
});

module.exports = router;
