import invitationRepository from "../../repositories/invitationRepository";

export default async (invitationId: string): Promise<boolean> => {
  const invitation = await invitationRepository.getById(invitationId);
  return invitation != null;
};
