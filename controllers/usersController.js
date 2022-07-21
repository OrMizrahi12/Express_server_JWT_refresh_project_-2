const User = require('../model/User');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const getAllUsers = async (req, res) => {
    const users = await User.find();
    if (!users) return res.status(204).json({ 'message': 'No users found' });
    res.json(users);
}

const deleteUser = async (req, res) => {
    if (!req?.params?._id) return res.status(400).json({ "message": 'User ID required' });
    const user = await User.findOne({ _id: req.params._id }).exec();
    if (!user) {
        return res.status(204).json({ 'message': `User ID ${req.params._id} not found` });
    }
    const result = await user.deleteOne({ _id: req.params._id });
    res.json(result);
}

const getUser = async (req, res) => {
    if (!req?.params?._id) return res.status(400).json({ "message": 'User ID required' });
    const user = await User.findOne({ _id: req.params._id }).exec();
    if (!user) {
        return res.status(204).json({ 'message': `User ID ${req.params._id} not found` });
    }
    res.json(user);
}

const updateUser = async (req, res) => {

    const { email, pwd, user } = req.body;
    let arr = []
    if (!req?.params?._id) return res.status(400).json({ "message": 'User ID required' });

    if (!user || !pwd || !email) {
        !user && arr.push('user');
        !email && arr.push('email');
        !pwd && arr.push('pwd');

        return res.status(400).json({ 'you forgat': arr });
    }

    const duplicate = await User.findOne({ email: email ,user: user}).exec();
    if (duplicate) return res.sendStatus(409).json({"msg": "this name or email is exsist"}) 

    const founduser = await User.findOne({ _id: req.params._id }).exec();
    if (!founduser) {
        return res.status(204).json({ 'message': `User ID ${req.params._id} not found` });
    }

    const accessToken = jwt.sign(
        {
            "UserInfo": {
                "username": founduser.username,
                "roles": founduser.roles
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '60m' }
    );
    const refreshToken = jwt.sign(
        { "username": founduser.username },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '1d' }
    );
    founduser.refreshToken = refreshToken;

    res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 }); // 
    // secure: true
   
    const hashedPwd = await bcrypt.hash(pwd, 10);

    if (req.body?.email) founduser.email = req.body.email;
    if (req.body?.pwd) founduser.password = hashedPwd;
    if (req.body?.user) founduser.username = req.body.user;

    const result = await founduser.save();
    res.json(result);


}

module.exports = {
    getAllUsers,
    deleteUser,
    getUser
    
}