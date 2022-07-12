const express = require('express');

const app = express();
const port = process.env.PORT || 5000;

console.log('starting server');
app.listen(port);
