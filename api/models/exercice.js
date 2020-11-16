/***** GLOBAL IMPORTS *****/
const mongoose = require('mongoose');

const exerciceSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    description: String,
    category: String,
    model: String,
    audio: String,
    image: String,
});

module.exports = mongoose.model('Exercice', exerciceSchema);