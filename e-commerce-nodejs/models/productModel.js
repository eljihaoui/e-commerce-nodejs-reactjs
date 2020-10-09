const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 150,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      maxlength: 1000,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
    category: {
      type: ObjectId,
      ref: "Category",// your category model name 
      require: true,
    },
    shipping: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Product", productSchema);
