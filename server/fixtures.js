const mongoose = require('mongoose');
const config = require('./config');

const User = require('./models/User');
const Post = require('./models/Post');
const Comment = require('./models/Comment');

const run = async () => {
    await mongoose.connect(config.database, config.databaseOptions);

    const collections = await mongoose.connection.db.listCollections().toArray();

    for (let collection of collections) {
        await mongoose.connection.db.dropCollection(collection.name);
    }

    let users = await User.create(
        {username: 'test', password: '111', token: '111'},
        {username: 'test2', password: '222', token: '222'}
    );

    let posts = await Post.create(
        {
            title: 'First Post',
            user: users[0]._id,
            date: '2019-12-05T15:48:00.000',
            image: 'first-post.png'
        },
        {
            title: 'Second Post',
            user: users[0]._id,
            date: '2020-01-05T15:48:00.000',
            image: 'second-post.png'
        },
    );

    await Comment.create(
        {
            user: users[0]._id,
            post: posts[0]._id,
            text: 'Some comment',
        },
        {
            user: users[0]._id,
            post: posts[1]._id,
            text: 'Another comment',
        },
        {
            user: users[1]._id,
            post: posts[1]._id,
            text: 'Is it a comment?',
        }
    );

    await mongoose.connection.close();
};

run().catch(error => {
    mongoose.connection.close();
    throw error;
});