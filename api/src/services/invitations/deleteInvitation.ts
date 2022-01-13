import invitationRepository from "../../repositories/invitationRepository";

export default async (invitationId: string, rev: string) => {
  await invitationRepository.delete(invitationId, rev);
};
