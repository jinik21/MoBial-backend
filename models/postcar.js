const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postCar = new Schema({
    rentee_email: {
        type: String,
        required: true
    },
    vehicle_type: {
        type: String,
    },
    vehicle_name: {
        type: String,
    },
    vehicle_number: {
        type: String,
    },
    description: {
        type: String,
    },
    from_date: {
        type: String
    },
    to_date: {
        type: String
    },
    car_rc: {
        type: String
    },
    expected_charge: {
        type: String
    },
    vehicle_picture: {
        type: String,
    },
    status:{
        type:Boolean
    },
    date_posted:{
        type: Date,
        default: Date.now
    }
});
module.exports = postCar;