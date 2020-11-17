/***** GLOBAL IMPORTS *****/
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    fullName: String,
    phone: Number,
    email: String,
    password: String,
    sexe: String,
    birthday: Date,
    healthInformation: [{
        calories: { type: Number, default: 0 },
        date: Date,
        weight: Number,
        height: Number,
    }],
    runs: [{
        calories: { type: Number, default: 0 },
        distance: { type: Number, default: 0 },
        duration: { type: Number, default: 0 },
        date: { type: Date, default: null },
    }],
    activities: [{
        sum: { type: Number, default: 0 },
        _idExercice: {type: String, default: null}
    }],
});

module.exports = mongoose.model('User', userSchema);