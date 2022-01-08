const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const rewardSchema = new Schema({
  name: {
    type: String
  },
  location: {
    type: String
  },
  reward: {
    type: Number
  },
  picture:{
    type:String
  }
});
module.exports = rewardSchema;