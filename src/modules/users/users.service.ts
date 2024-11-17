import mongoose, { Query, Schema } from "mongoose";
import { UserModel } from "./users.model";
import { IUser, IUserReq } from "./users.types";
import bcrypt from "bcrypt";

class UserService {
  async getUsers() {
    return await UserModel.find();
  }
  async getUsersByEmail(email: string) {
    return await UserModel.findOne({ email });
  }
  async getUsersBySessionToken(sessionToken: string) {
    return await UserModel.findOne({
      "authentication.sessionToken": sessionToken,
    });
  }
  async getUsersById(_id: string, filter: Partial<IUser> = {}) {
    return await UserModel.findOne({ _id, ...filter });
  }

  async createUser(createdUserDto: IUserReq) {
    return await UserModel.create(createdUserDto);
  }

  async deleteUserById(id: string) {
    return await UserModel.findByIdAndUpdate(id, { isDeleted: true });
  }

  async updateUserById(
    id: Schema.Types.ObjectId,
    updateQuery: { [key: string]: any }
  ) {
    if (updateQuery.password) {
      const salt = bcrypt.genSaltSync(10);
      const hashed = bcrypt.hashSync(updateQuery.password, salt);
      updateQuery.password = hashed;
    }
    return UserModel.findByIdAndUpdate(id, updateQuery, { new: true });
  }

  async getPasswordHash(password: string) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }
}

export default new UserService();
