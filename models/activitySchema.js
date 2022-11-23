const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  ActivityID: {
    type: Number,
    required: true,
  },
  TaskID: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("ActivityData", postSchema);
