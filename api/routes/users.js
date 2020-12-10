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
                    error : error
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
                message: 'Mail does not exist! Try again',
            }
            );
        });
    }).catch(error => {
        console.log(error);
        res.status(500).json({ error: error });
    });
})

/***** POST RESQUEST *****/
/*** POST A RUN ***/
router.post('/runs/:idUser&:calories&:distance&:duration', (req, res, next) => {
    const id = req.params.idUser;
    const calories = req.params.calories;
    const distance = req.params.distance;
    const duration = req.params.duration;
    User.updateOne({ _id: id }, {
        $addToSet: {
            runs: [{
                calories: calories,
                distance: distance,
                duration: duration,
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

/*** POST A HEALTH INFORMATION ***/
router.post('/hi/:idUser&:calories&:steps&:weight&:height', (req, res, next) => {
    const id = req.params.idUser;
    User.updateOne({ _id: id }, {
        $addToSet: {
            healthInformation: [{
                calories: req.params.calories,
                steps: req.params.steps,
                date: Date.now(),
                weight: req.params.weight,
                height: req.params.height,
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

/*** POST A ACTIVITY ***/
router.post('/activities/:idUser&:sum&:categoryExercice', (req, res, next) => {
    const id = req.params.idUser;
    const sum = req.params.sum;
    const categoryExercice= req.params.categoryExercice
    User.updateOne({ _id: id }, {
        $addToSet: {
            activities: [{
                sum: sum,
                categoryExercice: categoryExercice,
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