import mongoose from "mongoose";
const { Schema } = mongoose;

const authorSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  tskoliID: {
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

export const Author = mongoose.model("Author", authorSchema);
