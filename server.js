const express = require('express');
const app = express();
const port = 3000;

const mongoose = require('mongoose');
const Category = require('./models/Category');
const Course = require('./models/Course');

const categories = require('./routes/categories');

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));

// REST API - CRUD
// - Create: POST /courses
// - Read: GET /courses && GET /courses/:id
// - Update: PUT /courses/:id && PATCH /courses/:id
// - Delete: DELETE /courses/:id

app.get('/', async (req, res) => {
  const courses = await Course.find();
  const categories = await Category.find();

  res.render('index', { courses, categories });
});
app.get('/create', async (req, res) => {
  const categories = await Category.find();

  res.render('create', { categories });
});
app.post('/create', async (req, res) => {
  const { category: categoryName, title, image, description } = req.body;
  const category = categoryName
    ? await Category.findOne({ name: categoryName })
    : null;

  const course = new Course({
    title,
    image,
    description,
    category: category?.id,
  });
  await course.save();

  res.redirect(`/course/${course.id}`);
});
app.get('/course/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate('category');
    if (course) {
      res.render('course', {
        course,
      });
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    res.sendStatus(404);
  }
});

app.use('/categories', categories);

app.listen(port, () => {
  mongoose.connect(
    'mongodb+srv://vic:G7h6k296kZfwrnQf@cms-cluster0.y1gul.mongodb.net/courses?retryWrites=true&w=majority'
  );
  console.log(`App listening at http://localhost:${port}`);
});
