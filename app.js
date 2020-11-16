/***** GLOBAL IMPORTS *****/
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

/***** UTILS CONFIG *****/
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/***** DATABASE CONNECTION *****/
mongoose.connect('mongodb+srv://admin:admin@scluptfit.ahsov.mongodb.net/ScluptFit?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


/***** HEADER CONFIG *****
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Header", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method == 'OPTIONS') {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        res.status(200).json({});
    }
});
*/

/***** ROUTES IMPORT *****/
const postsRoutes = require('./api/routes/posts');

/***** ROUTES *****/
app.use('/posts', postsRoutes);

module.exports = app;