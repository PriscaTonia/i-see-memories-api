import dotenv from "dotenv";
dotenv.config();

const envName = process.env.NODE_ENV || "development";

interface Ienv {
  NODE_ENV: string;
  DB_URI: string;
  PORT: number | string;
  APP_NAME: string;
  STRIPE_SECRET_KEY: string;
  STRIPE_ENDPOINT_SECRET_KEY: string;
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
  APP_NAME: process.env.APP_NAME || "i-see-memories",
  BASE_URL: process.env.BASE_URL,
  PORT: process.env.PORT || 3400,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  CLOUDINARY_CONFIG: {
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  },
};

const development: Ienv = {
  NODE_ENV: process.env.NODE_ENV || "development",
  DB_URI: process.env.DB_URI || "",
  PORT: process.env.PORT || 5000,
  APP_NAME: process.env.APP_NAME || "MyApp",
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY || "",
  STRIPE_ENDPOINT_SECRET_KEY: process.env.STRIPE_ENDPOINT_SECRET_KEY || "",
  CLOUDINARY_CONFIG: {
    cloud_name: process.env.CLOUDINARY_CONFIG_CLOUD_NAME || "",
    api_key: process.env.CLOUDINARY_CONFIG_API_KEY || "",
    api_secret: process.env.CLOUDINARY_CONFIG_API_SECRET || "",
  },
  // authCookieConfig: {},
  CLOUDINARY_FOLDER: process.env.CLOUDINARY_FOLDER || "",
  ADMIN_URL: process.env.ADMIN_URL || "",
  CLIENT_URL: process.env.CLIENT_URL || "",
  ...common,
};

const test: Ienv = {
  NODE_ENV: "test",
  DB_URI: `mongodb://localhost:27017/${common.APP_NAME}_test`,
  ...common,
};

const config: IenvMap = {
  development,
  // production,
  test,
};

export default config[envName];
