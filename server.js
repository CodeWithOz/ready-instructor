const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { logger } = require('./helpers');
const routeHandler = require('./routes');
const app = express();

const isProd = process.env.NODE_ENV === 'production';

app.use(cors);
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose
    .connect(process.env.MONGO_CONNECTION_STRING)
    .then(connection => {
        logger('connected to mongodb cluster');
    })
    .catch(error => {
        logger('error connecting to mongodb cluster', error);
        process.exit();
    });
if (!isProd) {
    mongoose.set('debug', true);
}

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
