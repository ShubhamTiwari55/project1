const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../Auth/auth.model');

const jwtSecret = process.env.JWT_SECRET;

const signup = async ({name, email, password, phone}) => {
    const existing = await User.findOne({email});
    if (existing) {
        throw new Error('Email already in use!');
    }
    const hashedPass = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password:hashedPass, phone });
    const token = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: '7d' });

    return { user, token };
};

const login = async ({email, password}) => {
    const user = await User.findOne({ email });
    if(!user){
        throw new Error('Invalid Credentials!');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        throw new Error('Invalid Credentials!');
    }
    const token = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: '7d' });
    return { user, token };
}

const getUser = async (userId) => {
    const user = await User.findById(userId);
    if (!user) throw new Error('User not found');
    return user;
};

const updateUser = async (userId, updates) => {
    const user = await User.findByIdAndUpdate(userId, updates, { new: true });
    if (!user) throw new Error('User not found');
    return user;
};

module.exports = {
    signup,
    login,
    getUser,
    updateUser
};
// This code provides authentication services for a Node.js application using JWT and bcrypt.