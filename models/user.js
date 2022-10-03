import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: String,
  email: String,
  pwd: String,
  add: String,
  cart: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CartItem",
    },
  ],
});

const User = new mongoose.model("User", userSchema);
export default User;
