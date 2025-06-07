const { getPreferences, updatePreferences } = require('./service');

exports.getPreferences = async (req, res) => {
    try {
        const preferences = await getPreferences(req.user.id);
        res.json({ success: true, preferences });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

exports.updatePreferences = async (req, res) => {
    try {
        const preferences = await updatePreferences(req.user.id, req.body);
        res.json({ success: true, preferences });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};
