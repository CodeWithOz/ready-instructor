const express = require('express');
const cors = require('cors');
const { logger } = require('./helpers');
const routeHandler = require('./routes');

const app = express();
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
    res.json({
        message: err.message || 'something went wrong',
        error: err,
    });
});

const port = process.env.PORT || 5000;
logger('starting server on port', port);
app.listen(port);
