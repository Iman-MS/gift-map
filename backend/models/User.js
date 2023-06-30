import mongoose from "mongoose";

// import slugify from "slugify";

const UserSchema = new mongoose.Schema({
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
  },
});

// UserSchema.pre("save", function (next) {
//   // the this keyword here is the documnet that is being saved
//   this.slug = slugify(this.name, { lower: true });
//   next();
// });

export default mongoose.model("User", UserSchema);
