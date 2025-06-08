const Request = require('../Req&Res/model');

const findNearbyRequests = async (lat, lng, radiusKm) => {
  const radiusMeters = radiusKm * 1000;

    const nearbyRequests = await Request.find({
    location: {
    $nearSphere: {
        $geometry: {
        type: "Point",
        coordinates: [lng, lat],
        },
        $maxDistance: radiusMeters,
    }
    }
});

    return nearbyRequests;
};

module.exports = {
    findNearbyRequests,
};
