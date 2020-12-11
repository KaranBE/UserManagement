const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please Add First Name"],
    },
    lastName: {
      type: String,
      required: [true, "Please Add Last Name"],
    },
    profile: {
      type: String,
      required: [true, "Please Add  A Profile Photo"],
    },
    phone: {
      type: String,
      required: [true, "Please Add A Phone Number"],
    },
    email: {
      type: String,
      required: [true, "please add an email"],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please add a valid email",
      ],
    },

    password: {
      type: String,
      required: [true, "Please Add a password"],
      minLength: 6,
      select: false,
    },
    resetPasswordToken: String,
    resetPasswordExpired: Date,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
//Encrypting our password before saving it into db.
UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  // this.email = await bcrypt.hash(this.email, salt);
  next();
});

module.exports = mongoose.model("User", UserSchema);
