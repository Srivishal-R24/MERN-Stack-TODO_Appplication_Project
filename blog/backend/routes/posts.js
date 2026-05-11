// routes/posts.js

const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// GET all posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET single post
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        res.status(200).json(post);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// CREATE post
router.post('/', async (req, res) => {

    const post = new Post({
        title: req.body.title,
        content: req.body.content,
        category: req.body.category,
        author: req.body.author,
        image: req.body.image,
    });

    try {
        const newPost = await post.save();
        res.status(201).json(newPost);

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// UPDATE post
router.put('/:id', async (req, res) => {

    try {

        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        post.title = req.body.title || post.title;
        post.content = req.body.content || post.content;
        post.category = req.body.category || post.category;
        post.author = req.body.author || post.author;
        post.image = req.body.image || post.image;
        post.updatedAt = Date.now();

        const updatedPost = await post.save();

        res.status(200).json(updatedPost);

    } catch (error) {

        res.status(400).json({ message: error.message });

    }
});

// DELETE post
router.delete('/:id', async (req, res) => {

    try {

        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        await Post.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: 'Post deleted successfully'
        });

    } catch (error) {

        res.status(500).json({ message: error.message });

    }
});

module.exports = router;