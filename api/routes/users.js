/***** GLOBAL IMPORTS *****/
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

/***** MODELS IMPORT *****/
const User = require('../models/user');

/***** GET REQUEST *****/
/*** GET A USER ***/
router.get('/find/:idUser', (req, res, next) => {
    const id = req.params.idUser;
    User.findById(id).exec().then(doc => {
        if (doc) {
            console.log(doc);
            res.status(200).json(doc);
        } else {
            res.status(404).json({ message: "404 NOT FOUND" });
        }
    }).catch(error => {
        console.log(error);
        res.status(500).json({ error: error });
    });
});

/***** POST RESQUEST *****/
/*** POST A USER ***/
router.post('/', (req, res, next) => {
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        fullName: req.body.fullName,
        phone: req.body.phone,
        email: req.body.email,
        password: req.body.password,
        sexe: req.body.sexe,
        birthday: req.body.birthday,
        healthInformation: [{
            calories: req.body.healthInformation.calories,
            date: Date.now(),
            weight: req.body.healthInformation.weight,
            height: req.body.healthInformation.height,
        }],
        runs: [{
            calories: req.body.runs.calories,
            distance: req.body.runs.distance,
            duration: req.body.runs.duration,
            date: Date.now()
        }],
        activities: [{
            sum: req.body.sum,
            _idExercice: req.body.activities._idExercice,
        }],
    });
    user.save().then(result => {
        console.log(result);
        res.status(201).json({
            user: result,
        });
    }).catch(error => console.log(error));
});

/***** PUT RESQUEST *****/
/*** PUT A RUN ***/
router.put('/runs/:idUser', (req, res, next) => {
    const id = req.params.idUser;
    User.updateOne({ _id: id }, {
        $addToSet: {
            runs: [{
                calories: req.body.runs.calories,
                distance: req.body.runs.distance,
                duration: req.body.runs.duration,
                date: Date.now()
            }]
        }
    }, function (err, result) {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
});

/*** PUT A HEALTH INFORMATION ***/
router.put('/hi/:idUser', (req, res, next) => {
    const id = req.params.idUser;
    User.updateOne({ _id: id }, {
        $addToSet: {
            healthInformation: [{
                calories: req.body.healthInformation.calories,
                date: Date.now(),
                weight: req.body.healthInformation.weight,
                height: req.body.healthInformation.height,
            }],
        }
    }, function (err, result) {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
});

/*** PUT A ACTIVITY ***/
router.put('/activities/:idUser', (req, res, next) => {
    const id = req.params.idUser;
    User.updateOne({ _id: id }, {
        $addToSet: {
            activities: [{
                sum: req.body.activities.sum,
                _idExercice: req.body.activities._idExercice,
            }],
        }
    }, function (err, result) {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
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

/***** LOGIN AND SIGNUP *****/
/*** SIGNUP ***/

/*** LOGIN ***/

module.exports = router;