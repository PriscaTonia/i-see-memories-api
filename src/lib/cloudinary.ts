import logger from "../config/logger";
import { v2 as cloudinary } from "cloudinary";
import env from "../config/env";

cloudinary.config(env.CLOUDINARY_CONFIG);

// console.log("ENV: ", env);

export const uploadImageToCloud = async function (filepath: string) {
  return await cloudinary.uploader.upload(
    filepath,
    {
      folder: `${env.CLOUDINARY_FOLDER}/images`,
      allowed_formats: ["jpg", "jpeg", "png", "webp"],
      use_filename: true,
      format: "webp",
    },
    function (result: any, err: any) {
      return { url: result?.secure_url, public_id: result?.public_id };
    }
  );
};

export const uploadVideoToCloud = async function (filepath: string) {
  return await cloudinary.uploader.upload(
    filepath,
    {
      folder: `${env.CLOUDINARY_FOLDER}/videos`,
      allowed_formats: ["mp4", "webm"],
      resource_type: "video",
      format: "webm",
      use_filename: true,
    },
    function (result: any, err: any) {
      return { url: result?.secure_url, public_id: result?.public_id };
    }
  );
};

export const uploadDocToCloud = async function (filepath: string) {
  return await cloudinary.uploader.upload(
    filepath,
    {
      folder: env.CLOUDINARY_FOLDER,
      allowed_formats: ["pdf", "doc", "docx"],
      resource_type: "raw",
      use_filename: true,
    },
    function (result: any, err: any) {
      return { url: result?.secure_url, public_id: result?.public_id };
    }
  );
};

export const getImageThumbnail = async function (uploadResult: any) {
  return await cloudinary.url(uploadResult.public_id, {
    width: 320,
    height: 320,
    crop: "fill",
  });
};

export const deleteFromCloud = async function (publicID: string) {
  return new Promise(async (resolve, reject) => {
    await cloudinary.uploader.destroy(publicID, function (result: any) {
      resolve(result);
    });
  });
};

export const multipleUpload = async function (filepaths: any[] = []) {
  try {
    const result = await Promise.all(
      filepaths.map(async (filepath: any) => await uploadImageToCloud(filepath))
    );
    return result;
  } catch (error) {
    throw error;
  }
};
