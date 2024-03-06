const mongoose = require("mongoose");
const { Schema } = mongoose;

const taskSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "New",
    enum: ["New", "Completed", "Inprogress", "Canceled"],
  },
  dueDate: {
    type: Date,
    required: true,
  },
  userID: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  udatedAt: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Task", taskSchema);
