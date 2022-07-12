const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors);

console.log('starting server');
const port = process.env.PORT || 5000;
app.listen(port);
