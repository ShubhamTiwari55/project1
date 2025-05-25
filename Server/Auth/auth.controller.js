const {
    signup,
    login,
    getUser,
    updateUser,
} = require('./auth.service');

exports.signup = async (req, res) => {  
    try {
        const { token, user } = await signup(req.body);
        res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email } });
    } catch (err) {
    res.status(400).json({ error: err.message });
    }
};

exports.login = async (req, res) => {
    try {
    const { token, user } = await login(req.body);
    res.status(200).json({ token, user: { id: user._id, name: user.name, email: user.email } });
    } catch (err) {
    res.status(401).json({ error: err.message });
    }
};

exports.getProfile = async (req, res) => {
    try {
    const user = await getUser(req.userId);
    res.json(user);
    } catch (err) {
    res.status(404).json({ error: err.message });
    }
};

exports.updateProfile = async (req, res) => {
    try {
    const updated = await updateUser(req.userId, req.body);
    res.json(updated);
    } catch (err) {
    res.status(400).json({ error: err.message });
    }
};
