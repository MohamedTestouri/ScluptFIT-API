/***** GLOBAL IMPORTS *****/
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    fullName: { type: String, require: true },
    phone: { type: Number, require: true, unique: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    sexe: { type: String, require: true },
    birthday: { type: Date, require: true },
    healthInformation: [{
        calories: { type: Number, default: 0 },
        steps: Number,
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
        categoryExercice: { type: String, default: null }
    }],
});

module.exports = mongoose.model('User', userSchema);