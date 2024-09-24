const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// Load existing blogs
const loadBlogs = () => {
    if (fs.existsSync('data.json')) {
        return JSON.parse(fs.readFileSync('data.json'));
    }
    return [];
};

// Save blogs
const saveBlogs = (blogs) => {
    fs.writeFileSync('data.json', JSON.stringify(blogs, null, 2));
};

// API to get blogs
app.get('/api/blogs', (req, res) => {
    res.json(loadBlogs());
});

// API to post a new blog
app.post('/api/blogs', (req, res) => {
    const blogs = loadBlogs();
    const newBlog = { id: Date.now(), ...req.body, likes: 0, dislikes: 0, comments: [] };
    blogs.push(newBlog);
    saveBlogs(blogs);
    res.status(201).json(newBlog);
});

// API to like a blog
app.post('/api/blogs/:id/like', (req, res) => {
    const blogs = loadBlogs();
    const blog = blogs.find(b => b.id === parseInt(req.params.id));
    if (blog) {
        blog.likes++;
        saveBlogs(blogs);
        res.json(blog);
    } else {
        res.status(404).send('Blog not found');
    }
});

// API to dislike a blog
app.post('/api/blogs/:id/dislike', (req, res) => {
    const blogs = loadBlogs();
    const blog = blogs.find(b => b.id === parseInt(req.params.id));
    if (blog) {
        blog.dislikes++;
        saveBlogs(blogs);
        res.json(blog);
    } else {
        res.status(404).send('Blog not found');
    }
});

// API to comment on a blog
app.post('/api/blogs/:id/comment', (req, res) => {
    const blogs = loadBlogs();
    const blog = blogs.find(b => b.id === parseInt(req.params.id));
    if (blog) {
        blog.comments.push(req.body.comment);
        saveBlogs(blogs);
        res.json(blog);
    } else {
        res.status(404).send('Blog not found');
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
