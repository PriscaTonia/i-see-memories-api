import { model, Schema } from "mongoose";
import { IPicture } from "./pictures.types";

const pictureSchema = new Schema<IPicture>(
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
      type: String,
      // ref::"",
    },
  },
  {
    timestamps: true,
  }
);

const Picture = model("picture", pictureSchema);

export default Picture;
