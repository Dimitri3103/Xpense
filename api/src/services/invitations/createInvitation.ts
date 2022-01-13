import Invitation from "../../models/invitation";
import invitationRepository, {
  CreateInvitationProps,
} from "../../repositories/invitationRepository";

export default async (
  invitation: CreateInvitationProps
): Promise<Invitation> => {
  return await invitationRepository.create(invitation);
};
