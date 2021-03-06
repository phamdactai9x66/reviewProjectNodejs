const mongoose = require("mongoose");

const slug = require("mongoose-slug-generator")
mongoose.plugin(slug);
const Schema = mongoose.Schema;//generate variable references to mongoose schema

const category = new Schema({//chung ta dang mo ta cai luc do(schema) trong colection category
  name: {
    type: String, maxLength: 255, require: true, trim: true
  },
  slug: { type: String, slug: "name", unique: true }
}, {
  timestamps: true
})
module.exports = mongoose.model("category", category);