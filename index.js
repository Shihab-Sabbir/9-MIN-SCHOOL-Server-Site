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


app.get('/course/:id', (req, res) => {
    const course = data.find(item => (item.id == req.params.id));
    res.send(course);
})

app.listen(PORT, () => {
    console.log('node is running on ', PORT);
})
