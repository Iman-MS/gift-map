import mongoose from "mongoose";

import User from "./User.js";

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

// static method to get average of users gifts prices
GiftSchema.statics.getAveragePrice = async function (userId) {
  console.log("Calculating average price...".blue);

  const obj = await this.aggregate([
    {
      $match: { userId: this.user },
    },
    {
      $group: {
        _id: "$user",
        averagePrice: { $avg: "$price" },
      },
    },
  ]);

  console.log(obj);

  try {
    await User.findByIdAndUpdate(userId, {
      averagePrice: obj[0] ? Math.trunc(obj[0].averagePrice) : 0,
    });
  } catch (err) {
    console.log(err);
  }
};

// call getAveragePrice after save
GiftSchema.post("save", function () {
  this.constructor.getAveragePrice(this.user);
});

// call getAveragePrice before deleteOne
GiftSchema.pre("deleteOne", { document: true, query: false }, function (next) {
  this.constructor.getAveragePrice(this.user);

  next();
});

export default mongoose.model("Gift", GiftSchema);
