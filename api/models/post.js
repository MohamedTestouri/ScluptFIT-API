/***** GLOBAL IMPORTS *****/
const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    text: String,
    likes: { type: Number, default: 0 },
    date: Date,
    image: String,
    idUser: String,
    comments: [{
        text: String,
        date: Date,
        idUser: String,
    }],

});

module.exports = mongoose.model('Post', postSchema);