import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema(
  {
    postedBy: {
      type: String,
      required: true,
    },
    postedByUserId: {
      type: String,
    },
    comment: {
      type: String,
      required: true,
    },
    likedBy: {
      type: [String],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);
const postSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    postedBy: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    likedBy: {
      type: [String],
    },
    totalLikes: {
      type: Number,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: {
      type: Date,
    },

    comments: {
      type: [commentSchema],
      default: [],
    },
  },
  { timestamps: true }
);

postSchema.pre("find", function () {
  this.where({ isDeleted: { $ne: true } });
});

postSchema.post("findOne", function (post) {
  if (post) {
    post.comments = post.comments.filter((comment) => !comment.isDeleted);
  }
});

const postModel = mongoose.model("Post", postSchema);

export default postModel;
