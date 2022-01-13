import invitationRepository from "../../repositories/invitationRepository";
import Invitation from "../../models/invitation";

export default async (
  invitationId: string
): Promise<Invitation | null | undefined> => {
  return await invitationRepository.getById(invitationId);
};
