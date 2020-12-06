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
router.get('/find/:idUser', (req, res, next) => {
    const id = req.params.idUser;
    Post.find({ idUser: id })
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
router.post('/comments/:idPost&:text&:idUser', (req, res, next) => {
    const id = req.params.idPost;
    const text = req.params.text;
    const idUser = req.params.idUser
    Post.updateOne({ _id: id }, {
        $addToSet: {
            comments: [{
                text: text,
                date: Date.now(),
                idUser: idUser
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
/*
router.delete('/comments/delete/:idPost&:idComment', (req,res,next)=>{
    const idPost = req.params.idPost;
    const idComment = req.params.idComment;
    Post.findOneAndDelete
});
*/

/***** UPDATE REQUEST *****/
/*** UPDATE A POST ***/
/*router.patch('/:idPost', (req, res, next) => {
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
});*/
router.patch('/likes/:idPost', (req, res, next) => {
    const idPost = req.params.idPost;
    Post.findByIdAndUpdate({ _id: idPost }, { $set: { likes: req.body.likes } }, function (err, result) {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
});
router.patch('/text/:idPost', (req, res, next) => {
    const idPost = req.params.idPost;
    Post.findByIdAndUpdate({ _id: idPost }, { $set: { text: req.body.text } }, function (err, result) {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
});

/*** UPDATE A COMMENT */
router.patch('/comments/update/:idPost&:idComment', (req, res, next) => {
    const idPost = req.params.idPost;
    const idComment = req.params.idComment;
    Post.findOneAndUpdate({ _id: idPost }, { $set: { comments: { text: req.body.comments.text } } }, { comments: { _id: idComment } }, function (err, result) {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
});

module.exports = router;