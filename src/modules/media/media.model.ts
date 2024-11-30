import { model, Schema } from "mongoose";
import { IMedia } from "./media.types";

const mediaSchema = new Schema<IMedia>(
  {
    url: { type: String, default: null },
    // duration: { type: Number, default: null },
    size: { type: Number },
    type: { type: String },
    public_id: { type: String },
    filename: { type: String },
    pageNo: { type: Number },
    order: {
      type: Schema.Types.ObjectId,
      ref: "order",
      // required: true,
    },
    itemId: {
      type: Schema.Types.ObjectId,
    },
  },
  {
    timestamps: true,
  }
);

const Media = model("media", mediaSchema);

export default Media;
