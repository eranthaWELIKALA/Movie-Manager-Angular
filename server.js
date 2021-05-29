const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(__dirname + '/dist/movie-manager'));

app.get('/*', (req, res) => {
    res.sendFile('index.html', {root: __dirname + '/dist/movie-manager/'});
});

app.listen(process.env.PORT || 8080);