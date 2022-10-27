const Post = require('../model/Post');

const getAllPosts = async (req, res) => {
    const post = await Post.find();
    if (!post) return res.status(204).json({ 'message': 'No posts found...' });
    res.json(post);
}

const createNewPost = async (req, res) => {
    const { title,body,userId} = req.body;
    let arr = []
    if (!title|| !body ||!userId) {
        
        !title && arr.push('title')
        !body && arr.push('body') 
        !userId && arr.push('userId')
        return res.status(400).json({ 'you must fill:':  arr });
    } 
 
    try {
        const result = await Post.create({
            title: req.body.title,
            body: req.body.body,
            userId: req.body.userId,
        });

        res.status(201).json(result);
    } catch (err) {
        console.error(err);
    }
}

const updatePost = async (req, res) => {
    const { title,body,userId} = req.body;

    if (!req?.params?._id) {
        return res.status(400).json({ 'message': 'ID parameter is required.' });
    }
    const post = await Post.findOne({ _id: req.params._id }).exec();
    if (!post) {
        return res.status(204).json({ "message": `No post matches ID ${req.body._id}.` });
    }
    if(!title || !userId || !body)
        return res.status(400).json({"msg":"you must put all diteils"})
    if (req.body?.title)
        post.title = req.body.title;
    if (req.body?.body)
        post.body = req.body.body;
    if (req.body?.userId)
        post.userId = req.body.userId;
    const result = await post.save();
    res.json(result);
}

const deletePost = async (req, res) => {
    if (!req?.params?._id)
        return res.status(400).json({ 'message': 'post ID required.' });
    const post = await Post.findOne({ _id: req.params._id }).exec();
    if (!post) {
        return res.status(204).json({ "message": `No post matches ID ${req.params._id}.` });
    }
    const result = await post.deleteOne(); //{ _id: req.body.id }
    res.json(result);
}

const getPost = async (req, res) => {
    if (!req?.params?._id)
        return res.status(400).json({ 'message': 'Worker ID required.' });
    const post = await Post.findOne({ _id: req.params._id }).exec();
    if (!post) {
        return res.status(204).json({ "message": `No post matches ID ${req.params._id}.` });
    }
    res.json(post);
}
module.exports = {
    getAllPosts,
    createNewPost,
    updatePost,
    deletePost,
    getPost
}
