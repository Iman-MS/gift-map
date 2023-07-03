import mongoose from "mongoose";

import Gift from "./Gift.js";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// import slugify from "slugify";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name"],
    },
    // slug: String,
    email: {
      type: String,
      required: [true, "Please add a email"],
      unique: true,
      trim: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please use a valid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
      minlength: 6,
      select: false,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    createdAt: {
      type: Date,
      default: Date.now,
    },
    averagePrice: Number,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// UserSchema.pre("save", function (next) {
//   // the this keyword here is the documnet that is being saved
//   this.slug = slugify(this.name, { lower: true });
//   next();
// });

// Cascade delete gifts when a user is deleted
UserSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function (next) {
    console.log(`Deleting the Gifts of the User ${this._id}`);
    await Gift.deleteMany({ user: this._id });

    next();
  }
);

// this is a reverse populate with virtuals
UserSchema.virtual("gifts", {
  ref: "Gift",
  localField: "_id",
  foreignField: "user",
  justOne: false,
});

// Encrypt password using bcrypt
UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

// statics are called on the model but the methods are called on the instances of a model
// Sign JWT and return
UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

export default mongoose.model("User", UserSchema);
