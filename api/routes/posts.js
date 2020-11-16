/***** GLOBAL IMPORTS *****/
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

/***** MODELS IMPORT *****/
const Post = require('../models/post');

/***** GET REQUEST *****/
/*** FIND ALL POSTS ***/
router.get('/', (req, res, next) => {
    Post.find().sort('-date').exec().then(doc => {
        console.log(doc);
        res.status(200).json(doc);
    }).catch(error => {
        console.log(error);
        res.status(500).json({ error: error });
    });
});

/*** FIND BY ID POST ***/
router.get('/:idPost', (req, res, next) => {
    const id = req.params.idPost;
    Post.findById(id).exec().then(doc => {
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
})

/*** FIND BY ID USER ***/

/***** POST RESQUEST *****/
/*** POST A POST ***/
router.post('/', (req, res, next) => {
    const post = new Post({
        _id: new mongoose.Types.ObjectId(),
        text: req.body.text,
        likes: 0, // I have to put it 0 
        date: Date.now(),
        image: req.body.image,
        idUser: req.body.idUser
    });
    post.save().then(result => {
        console.log(result);
        res.status(201).json({
            post: result,
        });
    }).catch(error => console.log(error));
});
/*** POST A COMMENT ***/


/***** DELETE REQUEST *****/
/*** DELETE A POST ***/
router.delete('/:idPost', (req, res, next) => {
    const id = req.params.idPost;
    Post.remove({ _id: id }).exec().then(result => {
        res.status(200).json(result);
    }).catch(error => {
        console.log(error);
        res.status(500).json({ error: error });
    });
});

/*** DELETE A COMMENT ***/

/***** UPDATE REQUEST *****/
/*** UPDATE A POST ***/
router.patch('/:idPost', (req, res, next) => {
    const id = req.params.idPost;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    };
    Post.update({ _id: id }, { $set: updateOps }).exec().then(doc => {
        console.log(doc);
        res.status(200).json(doc);
    }).catch(error => {
        console.log(error);
        res.status(500).json({ error: error });
    });
});

/*** UPDATE A COMMENT */

module.exports = router;