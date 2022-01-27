import mongoose from "mongoose";
const Schema = mongoose.Schema;

let articleSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		subtitle: {
			type: String,
		},
		published: {
			type: Boolean,
			required: true,
		},
		content: {
			type: String,
			required: true,
		},
		created: {
			type: Date,
			default: Date.now,
		},
		author: {
			type: String,
			required: true,
		},
	},
	{
		collection: "articles",
	}
);

export default mongoose.model("Articles", articleSchema);
