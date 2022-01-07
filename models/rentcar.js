const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const rentcar = new Schema({
    renter_email: {
        type: String,
        required: true
    },
    vehicle_id: {
        type: String,
    },
    from_date: {
        type: String,
    },
    to_date: {
        type: String,
    },
    status: {
        type: String,
    },
    id_proof: {
        type: String,
    },
    date_posted:{
        type: Date,
        default: Date.now
    }
});
module.exports = rentcar;