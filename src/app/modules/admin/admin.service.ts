import User from "./admin.model";

export const blockUser = async (userId: string) => {
  return User.findByIdAndUpdate(userId, { isBlocked: true }, { new: true });
};
