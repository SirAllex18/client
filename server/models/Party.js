import mongoose from "mongoose";

const PartySchema = new mongoose.Schema(
  {
    role: {
      type: String,
      required: true,
    },
    users: [
      {
        firstName: String,
        lastName: String,
        buget: String
      }
    ]
  },
  { timestamps: true }
);

const Party = mongoose.model("Party", PartySchema);
export default Party;
