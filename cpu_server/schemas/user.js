const mongoose = require("mongoose");
const { Schema} = mongoose;

const userSchema = new Schema({
    email: {
        type:String,
        required: true,
        unique:true //  email은 고유한 값을 가져야 함.
    },
    name: {
        type:String,
        required: true,
    },
    password: {
        type:String,
        required: true,
    },
    salt: {
        type: String,
        required: true
      },
    createdAt: {
        type: Date,
        default: Date.now
    },
    loginCnt: {
        type: Number,
        default: 0
      },
      lockYn: {
        type: Boolean,
        default: false
      }
});

module.exports = mongoose.model("User", userSchema);