/***** GLOBAL IMPORTS *****/
const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    text: String,
    likes: Number,
    date: Date,
    image: String,
});

module.exports= mongoose.model('Post', postSchema);