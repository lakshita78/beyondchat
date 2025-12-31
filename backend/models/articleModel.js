const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  authorDate: {
    type: String
  },
  link: {
    type: String
  },
  description: {
    type: String
  },
  updatedContent: {
    type: String
  },
  references: {
    type: [String]
  }
});

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;
