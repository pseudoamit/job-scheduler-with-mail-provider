const mongoose = require("mongoose");
const { Schema } = mongoose;

const schedulerSchema = new Schema({
  email: [{ type: String }],
  time: { type: Date },
  subject: { type: String },
  body: { type: String },
});

module.exports = mongoose.model("scheduler", schedulerSchema);
