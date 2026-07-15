import mongoose, { Schema } from "mongoose";

const storedFileSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    mimeType: {
      type: String,
      required: true
    },
    size: {
      type: Number,
      required: true
    },
    data: {
      type: Buffer,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const StoredFile =
  mongoose.models.StoredFile || mongoose.model("StoredFile", storedFileSchema);

export default StoredFile;
