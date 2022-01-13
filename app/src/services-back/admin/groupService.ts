import { httpClient } from "../../utils/httpClient";
import Group from "../../models/group";
import User from "../../models/user";
import ExpenseType from "../../models/expenseType";

const getGroups = async (orgId: string): Promise<Group[]> => {
  const { data } = await httpClient.get<Group[]>(`/org/${orgId}/groups`);
  return data;
};

const getGroup = async (orgId: string, groupId: string): Promise<Group> => {
  const { data } = await httpClient.get<Group>(
    `/org/${orgId}/groups/${groupId}`
  );
  return data;
};

const createGroup = async (orgId: string, payload: any): Promise<Group> => {
  const { data } = await httpClient.post<Group>(
    `/org/${orgId}/groups`,
    payload
  );
  return data;
};

const updateGroup = async (
  orgId: string,
  groupId: string,
  payload: any
): Promise<Group> => {
  const { data } = await httpClient.put<Group>(
    `/org/${orgId}/groups/${groupId}`,
    payload
  );
  return data;
};

const deleteGroup = async (orgId: string, groupId: string): Promise<Group> => {
  const { data } = await httpClient.delete<Group>(
    `/org/${orgId}/groups/${groupId}`
  );
  return data;
};

const addUserToGroup = async (
  orgId: string,
  groupId: string,
  payload: any
): Promise<User> => {
  const { data } = await httpClient.patch<User>(
    `/org/${orgId}/groups/${groupId}/members`,
    payload
  );
  return data;
};

const addSupervisorToGroup = async (
  orgId: string,
  groupId: string,
  payload: any
): Promise<User> => {
  const { data } = await httpClient.patch<User>(
    `/org/${orgId}/groups/${groupId}/supervisors`,
    payload
  );
  return data;
};

const removeUserFromGroup = async (
  orgId: string,
  groupId: string,
  userId: string
): Promise<User> => {
  const { data } = await httpClient.delete<User>(
    `/org/${orgId}/groups/${groupId}/members/${userId}`
  );
  return data;
};
const removeSupervisorFromGroup = async (
  orgId: string,
  groupId: string,
  userId: string
): Promise<User> => {
  const { data } = await httpClient.delete<User>(
    `/org/${orgId}/groups/${groupId}/supervisors/${userId}`
  );
  return data;
};

const assignExpenseTypesToGroup = async (
  orgId: string,
  groupId: string,
  payload: any
): Promise<ExpenseType> => {
  const { data } = await httpClient.patch<ExpenseType>(
    `/org/${orgId}/groups/${groupId}/expense-types`,
    payload
  );
  return data;
};

export {
  getGroups,
  createGroup,
  deleteGroup,
  updateGroup,
  getGroup,
  addUserToGroup,
  removeUserFromGroup,
  assignExpenseTypesToGroup,
  addSupervisorToGroup,
  removeSupervisorFromGroup,
};
