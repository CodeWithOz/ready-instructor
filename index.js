const express = require('express');
const cors = require('cors');
const { logger } = require('./helpers');

const app = express();
app.use(cors);

const port = process.env.PORT || 5000;
logger('starting server on port', port);
app.listen(port);
