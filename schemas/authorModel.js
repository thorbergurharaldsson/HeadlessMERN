import mongoose from "mongoose";
const { Schema } = mongoose;

const commentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
  },
  articles: {
    type: Array,
  },
});

export const Comment = mongoose.model("Comment", commentSchema);
