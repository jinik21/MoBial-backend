const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true,
    maxLength: 13
  },
  dob: {
    type: String,
  },
  address: {
    type: String,
  },
  pincode: {
    type: String,
  },
  picture: {
    type: String,
  },
  password: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now
  },
});
module.exports = userSchema;