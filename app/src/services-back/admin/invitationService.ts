import { httpClient } from "../../utils/httpClient";
import Invitation from "../../models/invitation";

const getInvitations = async (orgId: string): Promise<Invitation[]> => {
  const { data } = await httpClient.get<Invitation[]>(
    `/org/${orgId}/invitations`
  );
  return data;
};

const getInvitation = async (
  orgId: string,
  invitationId: string
): Promise<Invitation> => {
  const { data } = await httpClient.get<Invitation>(
    `/org/${orgId}/invitations/${invitationId}`
  );
  return data;
};

const createInvitation = async (
  orgId: string,
  payload: any
): Promise<Invitation> => {
  const { data } = await httpClient.post<Invitation>(
    `/org/${orgId}/invitations`,
    payload
  );
  return data;
};

const updateInvitation = async (
  orgId: string,
  invitationId: string,
  payload: any
): Promise<Invitation> => {
  const { data } = await httpClient.put<Invitation>(
    `/org/${orgId}/invitations/${invitationId}`,
    payload
  );
  return data;
};

const deleteInvitation = async (
  orgId: string,
  invitationId: string
): Promise<Invitation> => {
  const { data } = await httpClient.delete<Invitation>(
    `/org/${orgId}/invitations/${invitationId}`
  );
  return data;
};

export {
  getInvitations,
  getInvitation,
  createInvitation,
  updateInvitation,
  deleteInvitation,
};
