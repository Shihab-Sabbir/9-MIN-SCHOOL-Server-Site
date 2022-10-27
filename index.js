const express = require('express');
const cors = require('cors');
const app = express();
const data = require('./data.json');
const PORT = process.env.PORT || 5000;
app.use(cors());

app.get('/', (req, res) => {
    res.send('hello world');
})
app.get('/courses', (req, res) => {
    res.send(data)
})
app.get('/courses/:page', (req, res) => {
    let courses = data.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
    let pageNumber = parseInt(req.params.page);
    const start = 1 + (pageNumber - 1) * 6;
    let end = 7 + (pageNumber - 1) * 6;
    let limitedData = courses.slice(start - 1, end - 1);
    const sendData = { pages: data.length, data: [...limitedData], start, end };
    res.send(sendData);
})

app.get('/course/:id', (req, res) => {
    const course = data.find(item => (item.id == req.params.id));
    res.send(course);
})

app.get('/search/:course_name', (req, res) => {
    const course = data.filter(item => (item.name.toLowerCase()).includes(req.params.course_name.toLowerCase()) || (item.details.toLowerCase()).includes(req.params.course_name.toLowerCase()))
    res.send(course);
})

app.listen(PORT, () => {
    console.log('node is running on ', PORT);
})
