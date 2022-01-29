import mongoose from "mongoose";
const { Schema } = mongoose;

const commentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  comment: {
    type: String,
    required: true,
  },
  posted_at: {
    type: Date,
    default: Date.now,
  },
  article_id: {
    type: String,
    required: true,
  },
});

export const Comment = mongoose.model("Comment", commentSchema);
