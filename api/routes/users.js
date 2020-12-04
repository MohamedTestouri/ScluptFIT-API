/***** GLOBAL IMPORTS *****/
const { hash } = require('bcrypt');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

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

/*** GET A USER ***/
router.get('/find', (req, res, next) => {
    const id = req.params.idUser;
    User.find().then(doc => {
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

/***** LOGIN AND SIGNUP *****/
/*** SIGNUP ***/
router.post('/signup', (req, res, next) => {
    User.find({ email: req.body.email }).exec().then(user => {
        if (user >= 1) {
            return res.status(409).json({ message: 'Mail Exists', });
        } else {
            bcrypt.hash(req.body.password, 10, (error, hash) => {
                if (error) {
                    return res.status(500).json({ error: error, });
                } else {
                    const user = new User({
                        _id: new mongoose.Types.ObjectId(),
                        fullName: req.body.fullName,
                        phone: req.body.phone,
                        email: req.body.email,
                        password: hash,
                        sexe: req.body.sexe,
                        birthday: req.body.birthday,
                        
                    });
                    user.save().then(result => {
                        console.log(result);
                        res.status(201).json({
                            message: "User Created",
                            user: result,
                        });
                    }).catch(error => console.log(error));
                }
            });
        }
    });
});
/*** LOGIN ***/
router.post('/login', (req, res, next) => {
    User.find({ email: req.body.email }).exec().then(user => {
        if (user.length < 1) { return res.status(401).json({ message: 'Mail not found', }); }
        bcrypt.compare(req.body.password, user[0].password, (error, result) => {
            if (error) {
                return res.status(401).json({
                    message: 'Nothing to show',
                });
            }
            if (result) {
                const token = jwt.sign({
                    email: user[0].email,
                    idUser: user[0]._id,
                }, process.env.JWT_KEY, {
                    expiresIn: "24h"
                });
                return res.status(200).json({
                    message: 'Successful',
                    token: token
                });
            }
            res.status(401).json({
                message: 'Mail not existe',
            });
        });
    }).catch(error => {
        console.log(error);
        res.status(500).json({ error: error });
    });
})

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
                steps: req.body.healthInformation.steps,
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
/*** PATCH AN ACTIVITY ***/
router.patch('/activities/:idUser/update/:category', (req, res, next) => {
    const id = req.params.idUser;
    const category = req.params.category;
    User.findOneAndUpdate({ _id: id }, { $set: { activities: { sum: req.body.activities.sum, categoryExercice: category } } }, { activities: { categoryExercice: category } }, function (err, result) {
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

module.exports = router;