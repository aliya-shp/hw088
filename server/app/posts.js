const path = require('path');

const express = require('express');
const multer = require('multer');
const nanoid = require('nanoid');

const config = require('../config');
const auth = require('../middleware/auth');
const Post = require('../models/Post');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    }
});

const upload = multer({storage});

const router = express.Router();

router.get('/', async (req, res) => {
    const posts = await Post.find().sort({date: -1});
    res.send(posts);
});

router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).send({message: 'Not found'});
        }

        res.send(post);
    } catch (e) {
        res.status(404).send({message: 'Not found'});
    }
});

router.post('/', auth, upload.single('image'), async (req, res) => {
    const postData = req.body;

    if (req.file) {
        postData.image = req.file.filename;
    } else if (!req.file && !postData.description) {
        return res.status(400).send({message: 'Please enter either image or description'})
    }

    postData.date = new Date().toISOString();

    const post = new Post(postData);

    try {
        await post.save();

        return res.send({id: post._id});
    } catch (error) {
        return res.status(400).send(error);
    }
});

module.exports = router;