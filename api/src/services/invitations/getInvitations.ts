import Invitation from "../../models/invitation";
import invitationRepository from "../../repositories/invitationRepository";

export default async (orgId?: string): Promise<Invitation[]> => {
  return await invitationRepository.list(orgId);
};
