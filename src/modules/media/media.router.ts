import { imageMulter } from "../../lib/multer";
import validateBy from "../../middlewares/validator";
import { addMediaValSchema } from "./media.validators";
import mediaController from "./media.controller";

const mediaRouter = require("express").Router();

mediaRouter.post(
  "/media",
  // [imageMulter.array("files"), validateBy(addPictureValSchema)],
  [imageMulter.single("file"), validateBy(addMediaValSchema)],
  mediaController.create
);

mediaRouter.post("/media/delete", mediaController.delete);

mediaRouter.post("/media/delete-by-url", mediaController.deleteByUrl);

export default mediaRouter;
