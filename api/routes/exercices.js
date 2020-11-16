/***** GLOBAL IMPORTS *****/
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

/***** MODELS IMPORT *****/
const Exercice = require('../models/exercice');

/***** GET REQUEST *****/
/*** FIND ALL EXERCICES ***/
router.get('/', (req, res, next) => {
    Exercice.find().exec().then(doc => {
        console.log(doc);
        res.status(200).json(doc);
    }).catch(error => {
        console.log(error);
        res.status(500).json({ error: error });
    });
});

/*** FIND BY ID EXERCICES ***/
router.get('/:idExercice', (req, res, next) => {
    const id = req.params.idExercice;
    Exercice.findById(id).exec().then(doc => {
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

/*** FIND BY CATEGORY EXERCICES ***/
router.get('/:category', (req, res, next) => {
    const category = req.params.category;
    Exercice.find()
    .exec().then(doc => {
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

module.exports = router;