const express = require('express');

const Comment = require('../models/Comment');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', async (req, res) => {
    let comments;
    if (req.query.post) {
        comments = await Comment.find({post: req.query.post}).sort({date: -1});
    } else {
        comments = await Comment.find().sort({date: -1});
    }
    return res.send(comments);
});

router.post('/', auth, async (req, res) => {
    const comment = new Comment(req.body);

    await comment.save();

    return res.send(comment);
});

module.exports = router;