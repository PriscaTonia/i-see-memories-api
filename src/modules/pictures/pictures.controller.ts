import { Request, Response } from "express";
import {
  deleteFromCloud,
  multipleUpload,
  uploadDocToCloud,
  uploadImageToCloud,
  uploadVideoToCloud,
} from "../../lib/cloudinary";

import response from "../../utils/response";
import pictureService from "./pictures.service";
import { getMediaType, uploadFncs } from "../../utils/helpers";
import * as fs from "fs/promises";
import { IPicture } from "./pictures.types";
import { NotFoundError } from "../../config/errors";

class PictureController {
  async create(req: Request, res: Response) {
    // for uploading multiple files

    // const filesReq = req?.files;
    // const files = filesReq as unknown as Express.Multer.File[];
    // const cloudinaryUploadRes = await multipleUpload(
    //   files?.map((file: any) => file?.path)
    // );
    // console.log(cloudinaryUploadRes);

    //const picture = awaitpictureService.createBulk(
    //   cloudinaryUploadRes?.map((upload, index) => ({
    //     filename: upload.original_filename,
    //     public_id: upload.public_id,
    //     size: upload.bytes,
    //     type: upload.format,
    //     url: upload.secure_url,
    //     duration: upload?.duration || null,
    //     pageNo: index + 1,
    //   }))
    // );

    // files?.map(async (file) => await fs.unlink(file.path));

    // res.send(response("Successfully savedpicture",picture));

    // for uploading a single file

    const { file, body } = req;

    // console.log({ file, body });

    const fileType = getMediaType(file.mimetype);
    const uploader = uploadFncs[fileType];
    const upload = await uploader(file.path);

    // console.log({ file, url: upload.secure_url, upload });

    const picture = await pictureService.create({
      filename: upload.original_filename,
      public_id: upload.public_id,
      size: upload.bytes,
      type: upload.format,
      url: upload.secure_url,
      // duration: upload?.duration || null,
      pageNo: body?.pageNo,
      order: body?.orderId,
      itemId: body?.itemId,
    });

    await fs.unlink(file.path);

    res.send(response("Successfully savedpicture", picture));
  }

  async delete(req: Request, res: Response) {
    await deleteFromCloud(req.body.public_id);

    res.send(response("Successfully deletedpicture"));
  }

  async deleteByUrl(req: Request, res: Response) {
    const url = req.body.url;
    // console.log({ url });
    const picture: IPicture = await pictureService.findByUrl(url);
    // console.log({picture });
    if (picture) await deleteFromCloud(picture.public_id);
    await pictureService.deleteByUrl(url);
    res.send(response("Successfully deletedpicture"));
  }
}

export default new PictureController();
