const {
    signup,
    login,
    getUser,
    updateUser,
    verifyEmail,
} = require('./auth.service');

exports.signup = async (req, res) => {
  try {
    const response = await signup(req.body);
    res.status(201).json(response);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.verifyEmail = async (req, res) => {
  try {
    const response = await verifyEmail(req.query.token);
    res.status(200).json(response);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { user, token } = await login(req.body);
    res.status(200).json({ token, user: { id: user._id, email: user.email } });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

exports.getProfile = async (req, res) => {
    try {
    const user = await getUser(req.user.userId);
    res.json(user);
    } catch (err) {
    res.status(404).json({ error: err.message });
    }
};

exports.updateProfile = async (req, res) => {
    try {
    const userId = req.user.userId;

    const updates = {
        name: req.body.name,
        phone: req.body.phone,
    };

    if (req.file && req.file.path) {
        updates.profilePic = req.file.path;
    }

    const updatedUser = await updateUser(userId, updates);

    if (!updatedUser) {
        return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({
        message: 'Profile updated successfully',
        user: updatedUser,
    });
    } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
    }
};

