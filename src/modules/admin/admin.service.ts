import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import env from "../../config/env";
import { AdminModel } from "./admin.model";
import { IAdmin, IAdminReq } from "./admin.types";

class AdminService {
  async getAdminByEmail(email: string) {
    return await AdminModel.findOne({ email });
  }
  async getAdminById(_id: string) {
    return await AdminModel.findOne({ _id });
  }
  async createAdmin(createdAdminDto: IAdminReq) {
    return await AdminModel.create(createdAdminDto);
  }
  async validPassword(input: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(input, hash || "");
  }
  verifyAuthToken(token: string) {
    return jwt.verify(token, process.env.JWT_SECRET_KEY) as {
      _id: string;
      email: string;
    };
  }
  generateAuthToken = (user: any) => {
    let dataToSign = { _id: user._id, email: user.email };
    return jwt.sign({ ...dataToSign }, env.JWT_SECRET_KEY, { expiresIn: "1d" });
  };
}

export default new AdminService();
