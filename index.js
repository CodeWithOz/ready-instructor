const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { logger } = require('./helpers');
const routeHandler = require('./routes');
const app = express();

const isProd = process.env.NODE_ENV === 'production';

app.use(cors);
app.use(routeHandler);

// catch 404s
app.use((req, res, next) => {
    const error = new Error('not found');
    error.status = 404;
    next(error);
});

// handle errors
app.use((err, req, res, next) => {
    res.status = err.status || 500;
    if (!isProd) {
        console.log(err.stack);
    }
    res.json({
        message: err.message || 'something went wrong',
        error: err,
    });
});

const port = process.env.PORT || 5000;
logger('starting server on port', port);
app.listen(port);
