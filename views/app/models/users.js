const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;//generate variable references to mongoose schema

const users = new Schema({//chung ta dang mo ta cai luc do(schema) trong colection category
  first_name: {
    type: String, maxLengt: 255, trim: true
  },
  last_name: {
    type: String, maxLengt: 255, trim: true
  },
  avatar: { type: String, default: "" },
  gender: { type: Boolean, default: false },
  email: { type: String, unique: true, required: true },
  address: { type: String, default: "" },
  userName: { type: String, unique: true, maxLengt: 255, trim: true, required: true },
  passWord: { type: String, maxLengt: 255, trim: true },
  google_id: {
    type: String,
    default: null
  },
  facebook_id: {
    type: String,
    default: null
  },
  authType: {
    type: String,
    enum: ["local", "google", "facebook"],
    default: "local"
  },
  role: { type: Number, default: 0 }
}, {
  timestamps: true
})

users.pre("save", async function nameasd(next) {
  try {
    if (this.authType != "local") { next() }
    let general_sal = await bcrypt.genSalt(10);

    let passWordHash = await bcrypt.hash(this.passWord, general_sal);

    this.passWord = passWordHash
    next();
  } catch (error) {
    next(error);
  }
})
module.exports = mongoose.model("user", users);