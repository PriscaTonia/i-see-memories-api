import { Request, Response } from "express";
import {
  deleteFromCloud,
  multipleUpload,
  uploadDocToCloud,
  uploadImageToCloud,
  uploadVideoToCloud,
} from "../../lib/cloudinary";

import response from "../../utils/response";
import pictureService from "./media.service";
import { getMediaType, uploadFncs } from "../../utils/helpers";
import * as fs from "fs/promises";
import { NotFoundError } from "../../config/errors";
import { IMedia } from "./media.types";

class MediaController {
  async create(req: Request, res: Response) {
    // for uploading a single file

    const { file, body } = req;

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

    res.send(response("Successfully saved picture", picture));
  }

  async delete(req: Request, res: Response) {
    await deleteFromCloud(req.body.public_id);

    res.send(response("Successfully deleted picture"));
  }

  async deleteByUrl(req: Request, res: Response) {
    const url = req.body.url;
    // console.log({ url });
    const picture: IMedia = await pictureService.findByUrl(url);
    // console.log({picture });
    if (picture) await deleteFromCloud(picture.public_id);
    await pictureService.deleteByUrl(url);
    res.send(response("Successfully deleted picture"));
  }
}

export default new MediaController();
