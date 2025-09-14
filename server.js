const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Set up static files
app.use(express.static('public'));
app.use(express.json());

// Set up view engine
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'dashboard.html'));
});

app.get('/curriculum', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'curriculum.html'));
});

app.get('/micro-content', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'micro-content.html'));
});

app.get('/exam-trends', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'exam-trends.html'));
});

app.get('/doubt-resolver', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'doubt-resolver.html'));
});

app.get('/concept-gaps', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'concept-gaps.html'));
});

app.get('/motivation-coach', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'motivation-coach.html'));
});

app.get('/vernacular-engine', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'vernacular-engine.html'));
});

app.listen(PORT, () => {
    console.log(`AI Learning Platform server running on http://localhost:${PORT}`);
});