const locationService = require('./service');

const getNearbyRequests = async (req, res) => {
    try {
    const lat = parseFloat(req.query.lat);
    const lng = parseFloat(req.query.lng);
    const radius = parseFloat(req.query.radius) || 5; // Default radius in kilometers

    if (isNaN(lat) || isNaN(lng)) {
    return res.status(400).json({ success: false, error: 'Invalid or missing lat/lng' });
    }

    const requests = await locationService.findNearbyRequests(lat, lng, radius);

    res.json({ success: true, requests });
    } catch (error) {
    res.status(500).json({ success: false, error: error.message });
    }
};

module.exports = {
    getNearbyRequests,
};
