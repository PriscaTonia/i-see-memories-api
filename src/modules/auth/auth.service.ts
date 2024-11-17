import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import env from "../../config/env";

class AuthService {
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

export default new AuthService();
