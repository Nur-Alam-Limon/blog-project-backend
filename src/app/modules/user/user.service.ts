import User from "./user.model";

class UserService {
  async getAllUsers() {
    return User.find().select("-password");
  }

  async getUserById(userId: string) {
    return User.findById(userId).select("-password");
  }

  async updateUser(userId: string, data: any) {
    return User.findByIdAndUpdate(userId, data, { new: true }).select("-password");
  }

  async blockUser(userId: string) {
    return User.findByIdAndUpdate(userId, { isBlocked: true }, { new: true });
  }

  async unblockUser(userId: string) {
    return User.findByIdAndUpdate(userId, { isBlocked: false }, { new: true });
  }
}

export default new UserService();
