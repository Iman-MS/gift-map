import mongoose from "mongoose";

const GiftSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, "Please add the gift title"],
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: [true, "Please enter the price of the gift"],
  },
  link: {
    type: String,
    required: [true, "Please enter the link to the gift"],
  },
  image: {
    type: String,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

export default mongoose.model("Gift", GiftSchema);
