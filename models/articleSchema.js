const mongoos = require("mongoose");

const articleSchema = new mongoos.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  tags: [String],
  category: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Draft", "Published"],
    default: "Draft",
  },
  likes: { type: Number, default: 0 },
  createAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now },
  comments: [{ type: mongoos.Schema.Types.ObjectId, ref: "Comment" }],
});

// export
module.exports = mongoos.model("Article", articleSchema);
