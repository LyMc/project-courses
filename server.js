const express = require('express');
const app = express();
const port = 3000;

const mongoose = require('mongoose');
const Course = require('./Course');

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));

// REST API - CRUD
// - Create: POST /courses
// - Read: GET /courses && GET /courses/:id
// - Update: PUT /courses/:id && PATCH /courses/:id
// - Delete: DELETE /courses/:id

app.get('/', async (req, res) => {
  const courses = await Course.find();

  res.render('index', { courses });
});
app.get('/create', (req, res) => {
  res.render('create');
});
app.post('/create', async (req, res) => {
  const { title, image, description } = req.body;
  const course = new Course({ title, image, description });
  await course.save();

  res.redirect(`/course/${course.id}`);
});
app.get('/course/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
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

app.listen(port, () => {
  mongoose.connect(
    'mongodb+srv://vic:G7h6k296kZfwrnQf@cms-cluster0.y1gul.mongodb.net/courses?retryWrites=true&w=majority'
  );
  console.log(`App listening at http://localhost:${port}`);
});
