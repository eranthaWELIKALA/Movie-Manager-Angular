const express = require('express');
const path = require('path');

const app = express();

app.unsubscribe(express.static('./dist/movie-manager'));

app.get('/*', (req, res) => {
    res.sendFile('index.html', {root: 'dist/movie-manager/'});
});

app.listen(process.env.PORT || 8080);