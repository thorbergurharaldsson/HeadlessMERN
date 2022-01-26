import mongoose from "mongoose";
const { Schema } = mongoose;
import mongooseSlugPlugin from "mongoose-slug-plugin";
import dayjs from "dayjs";

const articleSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  posted_at: {
    type: Date,
    default: Date.now,
  },
});

articleSchema.plugin(mongooseSlugPlugin, {
  tmpl: "<%=title%>-<%=dayjs(posted_at).format('YYYY-MM-DD')%>",
  locals: { dayjs },
});

// Export Article model
export const Article = mongoose.model("Article", articleSchema);
Article.get = (callback, limit) => {
  Article.find(callback).limit(limit);
};
