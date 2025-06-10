const express = require('express');
const router = express.Router();
const Blog = require('../Models/BlogSchema');
const User = require ('../Models/UserSchema');
const authTokenHandler = require('../Middlewares/checkAuthToken');
const jwt = require('jsonwebtoken');

// router.get('/test', authTokenHandler, async (req, res) => {
//     res.json({
//         message: 'test api works for blogs'
//     })
// })

const checkBlogOwnership = async (req, res, next) => {
    try{
        const blog = await Blog.findById(req.params.id);
        if(!blog) {
            return res.status(404).json({ message : ' Blog post not found'});
        }
        if( blog.owner.toString()!== req.userId) {
            return res.status(403).json({ message: 'Permission denied: You do not own this blog' });
        }
        req.blog = blog;
        next();
    }
    catch(err) {
        res.status(500).json({ message: err.message});
    }
}

router.post('/', authTokenHandler, async (req, res) => {
    try {
        
        const {title, description, image, paragraphs} = req.body;
        const blog = new Blog({ title, description, image, paragraphs, owner: req.userId});
        await blog.save();
        
        const user = await User.findById(req.userId);
        if(!user){
            return res.status(404).json({ message: 'User not found'});
        }
        
        user.blogs.push(blog._id);
        await user.save();
        res.status(201).json({ message: 'Blog post created Successfully', blog});
    }
    catch(err) {
       res.status(500).json({ message: err.message  });
    }
})

router.get('/:id', async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if(!blog) {
            return res.status(404).json( { message: ' Blog post not found'});
        }
        res.status(200).json(blog);
    }
    catch(err){
        res.status(500).json({ message : err.message});
    }
})

router.put('/:id', authTokenHandler, checkBlogOwnership, async (req, res) => {
    try {
        const { title, description, image, paragraphs} = req.body;
        const updatedBlog = await Blog.findByIdAndUpdate (
            req.params.id,
            { title, description, image, paragraphs },
            { new: true }
        );

        if (!updatedBlog) {
            return res.status(404).json({ message: 'Blog post not found'});
        }
        res.status(200).json ({ message:'Blog post updated successfully', updatedBlog})
    }
    catch (err) {
        res.status(500).jason({ message: err.message});
    }
})


router.delete('/:id', authTokenHandler, checkBlogOwnership, async (req, res) => {
    try {
        const deleteBlog = await Blog.findByIdAndDelete(req.params.id);

        if(!deleteBlog){
            return res.status(404).json({ message: "Blog post not found"});
        }
        
        const user = await User.findById(req.userId);
        if(!user) {
            return res.status(404).json({ message: "User not found"});
        }

        user.blogs.pull(req.params.id);
        await user.save();
        res.status(200).json({ message: "Blog deleted Successfully", deleteBlog});

    }
    catch(err) {
        res.status(500).json({ message: err.message});
    }
})

router.get('/', async ( req, res) => {
    try{
        const search = req.body.search || '';
        const page = parseInt(req.body.page) || 1;
        const perPage = 2;

        const searchQuery = new RegExp(search, 'i');

        const totalBlogs = await Blog.countDocuments({ title: searchQuery});
        const totalPages = Math.ceil(totalBlogs/ perPage);

        if(page < 1 || page > totalPages) {
            return res.status(400).json({ message: 'Invalid page number'});
        }

        const skip = (page - 1 ) * perPage;

        const blogs = await Blog.find({ title: searchQuery})
        .sort({ createdAt: -1})
        .skip(skip)
        .limit(perPage);

        res.status(200).json({ blogs, totalPages, currentPage: page});

    }
    catch(err) {
        res.status(500).json({ message: err.message});
    }
})
module.exports = router ;