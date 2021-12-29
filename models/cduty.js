const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cdutySchema = new Schema({
  name: {
    type: String
  },
  duty: {
    type: String
  },
  description: {
    type: String
  },
});
module.exports = cdutySchema;