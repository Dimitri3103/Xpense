import invitationRepository, {
  CreateInvitationProps,
} from "../../repositories/invitationRepository";

export default async (
  id: string,
  invitation: CreateInvitationProps
): Promise<void> => {
  await invitationRepository.edit(id, invitation);
};
