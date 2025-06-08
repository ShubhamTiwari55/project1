const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
    borrower: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    itemName: { type: String, required: true },
    itemCategory: { type: String, required: true },
    rentalStart: { type: Date, required: true },
    rentalEnd: { type: Date, required: true },
    location: { type: String, required: true },
    notes: { type: String },
    status: { type: String, enum: ['active', 'matched', 'cancelled'], default: 'active' },
    matchedLender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    isRated: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Request', requestSchema);
