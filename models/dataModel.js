import { Schema, model } from "mongoose";

const DataSchema = new Schema(
  {
    Country: {
      type: String,
    },

    County: {
      type: String,
    },
  },
  { timestamps: true }
);

export default model("Data", DataSchema);
