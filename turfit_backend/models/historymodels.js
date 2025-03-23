const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    turfBookings: [{
        turf: { type: mongoose.Schema.Types.ObjectId, ref: 'Turf', required: true },
        bookingDate: { type: Date, required: true },
        duration: { type: Number, required: true },
        totalPrice: { type: Number, required: true }
    }]
});  

const History = mongoose.model("History", historySchema);


module.exports = {  History};