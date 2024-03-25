const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
    categoryId:{
      type:mongoose.Schema.ObjectId,
      ref:'Category'
    },
    name: {
      type: String,
      required: true,
    },
    owner: {
      type: String,
      required: true,
    },
    mainImage: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    subImages: {
      type: [String],
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("Product", productSchema);
