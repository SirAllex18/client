import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    lastName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    password: {
      type: String,
      require: true,
      min: 8,
    },
    role: {
      type: String,
    }, 
    buget : {
      type : Number
    },
    email : {
      type: String
    }

  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema)

export default User

