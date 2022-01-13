import { FirebaseUser } from "../../models/user";
import userRepository from "../../repositories/userRepository";

export default async (
  uid: string,
  user: FirebaseUser
): Promise<FirebaseUser> => {
  return await userRepository.createWithGoogle(uid, user);
};
