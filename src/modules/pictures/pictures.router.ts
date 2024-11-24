const pictureRouter = require("express").Router();

import { imageMulter } from "../../lib/multer";
import validateBy from "../../middlewares/validator";
import { addPictureValSchema } from "./pictures.validators";
import pictureController from "./pictures.controller";

pictureRouter.post(
  "/pictures",
  // [imageMulter.array("files"), validateBy(addPictureValSchema)],
  [imageMulter.single("file"), validateBy(addPictureValSchema)],
  pictureController.create
);

pictureRouter.post("/picture/delete", pictureController.delete);

pictureRouter.post("/picture/delete-by-url", pictureController.deleteByUrl);

export default pictureRouter;
