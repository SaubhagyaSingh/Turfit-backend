const mongoose = require('mongoose');
const turfSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    isOpen: { type: Boolean, required: true },
    timings: { type: String, required: true }, 
    sports: [{ type: String, required: true }], 
    ownerName: { type: String, required: true },
    contact: { type: String, required: true },
    img: [{ type: String, required: true }] 
});
const Turf = mongoose.model("Turf", turfSchema);

module.exports = Turf;