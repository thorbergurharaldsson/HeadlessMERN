import mongoose from "mongoose";
const Schema = mongoose.Schema;

let assignmentsSchema = new Schema(
  {
    uniqueID: {
      type: String,
      required: true,
      unique: true,
    },
    author: {
      type: String,
      required: true,
    },
    moduleTitle: {
      type: String,
    },
    assignmentTitle: {
      type: String,
    },
    description: {
      type: String,
    },
    comment: {
      type: String,
    },
    url: {
      type: String,
    },
  },
  {
    collection: "assignments",
  }
);

export default mongoose.model("assignments", assignmentsSchema);
