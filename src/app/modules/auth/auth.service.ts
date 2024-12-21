import User from "../user/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../../config/index";

class AuthService {
  async register(data: any) {
    const { name, email, password } = data;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });
    return user;
  }

  async login(data: any) {
    const { email, password } = data;
    const user = await User.findOne({ email });
    if (!user) throw new Error("Invalid credentials");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid credentials");

    return jwt.sign({ id: user._id, role: user.role }, config.jwt_secret as string, {
      expiresIn: "1d",
    });
  }
}

export default new AuthService();
