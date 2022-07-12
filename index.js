const express = require('express');
const cors = require('cors');
const { logger } = require('./helpers');

const app = express();
app.use(cors);

logger('starting server');
const port = process.env.PORT || 5000;
app.listen(port);
