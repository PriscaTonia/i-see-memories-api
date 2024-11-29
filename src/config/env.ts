import dotenv from "dotenv";
dotenv.config();

const envName = process.env.NODE_ENV || "development";

interface Ienv {
  NODE_ENV: string;
  DB_URI: string;
  PORT: number | string;
  APP_NAME: string;
  PAYSTACK_SECRET_KEY: string;
  CLOUDINARY_CONFIG: {
    cloud_name: string;
    api_key: string;
    api_secret: string;
  };
  // authCookieConfig: { [key: string]: any };
  CLOUDINARY_FOLDER: string;
  ADMIN_URL: string;
  CLIENT_URL: string;
  [key: string]: any;
}

interface IenvMap {
  [key: string]: Ienv;
}

//acommon environmental variables for all environments
const common: any = {
  APP_NAME: process.env.APP_NAME || "i_see_memories",
  BASE_URL: process.env.BASE_URL,
  PORT: process.env.PORT || 5000,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  CLOUDINARY_CONFIG: {
    api_key: process.env.CLOUDINARY_CONFIG_API_KEY,
    api_secret: process.env.CLOUDINARY_CONFIG_API_SECRET,
    cloud_name: process.env.CLOUDINARY_CONFIG_CLOUD_NAME,
  },
};

const development: Ienv = {
  NODE_ENV: process.env.NODE_ENV || "development",
  DB_URI: `mongodb://localhost:27017/${common.APP_NAME}`,
  PAYSTACK_SECRET_KEY: process.env.PAYSTACK_SECRET_KEY || "",

  CLOUDINARY_FOLDER: "ism_dev",
  ADMIN_URL: process.env.ADMIN_URL || "",
  CLIENT_URL: process.env.CLIENT_URL || "",
  ...common,
};

const production: Ienv = {
  NODE_ENV: "production",
  DB_URI: process.env.DB_URI,
  PAYSTACK_SECRET_KEY: process.env.PAYSTACK_SECRET_KEY,

  CLIENT_URL: process.env?.CLIENT_URL || "",
  ADMIN_URL: process.env?.ADMIN_URL || "",
  CLOUDINARY_FOLDER: "ism_prod",
  ...common,
};

const test: Ienv = {
  NODE_ENV: "test",
  DB_URI: `mongodb://localhost:27017/${common.APP_NAME}_test`,
  ...common,
};

const config: IenvMap = {
  development,
  production,
  test,
};

export default config[envName];
