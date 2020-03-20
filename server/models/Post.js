const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    description: String,
    image: String,
    date: {
        type: Date,
        required: true
    },
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;