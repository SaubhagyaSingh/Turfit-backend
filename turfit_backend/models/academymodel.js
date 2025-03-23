const mongoose = require('mongoose');
const academySchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    sportsOffered: [{ type: String, required: true }],
    contact: { type: String, required: true },
    images: [{ type: String, required: true }] 
});
const Academy = mongoose.model("Academy", academySchema); 
module.exports=Academy;