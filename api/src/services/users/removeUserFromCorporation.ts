import userRepository from "../../repositories/userRepository";

export default async (userId: string, rev: string) => {
  await userRepository.delete(userId, rev);
};
