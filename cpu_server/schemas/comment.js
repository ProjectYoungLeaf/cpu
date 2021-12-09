const mongoose = require('mongoose');

const { Schema} = mongoose;
const {
    Types: {ObjectId}
} = Schema;

const commentSchema = new Schema(
  {
    board: {
      type: ObjectId,
      require: true,
      ref:"Board"
    },
    writer: {
      type: ObjectId,
      required : true,
      ref: 'User'
    },
    content: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    }
  },{
    timestamps: true
});
  
  module.exports = mongoose.model('Comment', commentSchema);