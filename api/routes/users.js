/***** GLOBAL IMPORTS *****/
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

/***** MODELS IMPORT *****/
const User = require('../models/user');

/***** POST RESQUEST *****/
/*** POST A USER ***/
router.post('/', (req, res, next) => {
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        fullName : req.body.fullName,
        phone: req.body.phone,
        email: req.body.email,
        password: req.body.password,
        sexe: req.body.sexe,
        birthday: req.body.birthday,
        healthInformation: {
            calories: req.body.calories,
            date: Date.now(),
            weight: req.body.weight,
            height: req.body.height,
        },
        runs: {
            calories: req.body.calories,
            distance: req.body.distance,
            duration: req.body.duration,
            date: Date.now()
        },
        activities: {
            sum: req.body.sum,
            _idExercice: req.body._idExercice,
        },
    });
    user.save().then(result => {
        console.log(result);
        res.status(201).json({
            user: result,
        });
    }).catch(error => console.log(error));
});

/***** DELETE REQUEST *****/
router.delete('/:idUser', (req, res, next) => {
    const id = req.params.idUser;
    User.remove({ _id: id }).exec().then(result => {
        res.status(200).json(result);
    }).catch(error => {
        console.log(error);
        res.status(500).json({ error: error });
    });
});

module.exports = router;