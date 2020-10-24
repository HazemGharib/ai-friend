/*eslint-disable*/
const express = require('express');
const serveStatic = require('serve-static');
const path = require('path');
const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config();
const app = express();



app.use('/', serveStatic(path.join(__dirname, '/dist')));

app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, '/dist/index.html'));
});

const port = process.env.PORT || 8000;
app.listen(port);
console.log(`app is listening on port: ${port}`);
