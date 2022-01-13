import { httpClient } from "../../utils/httpClient";
import User from "../../models/user";

const createUser = async (payload: any): Promise<User> => {
  const { data } = await httpClient.post<User>(`/users`, payload);
  return data;
};
const createUserWithGoogle = async (
  uid: string,
  payload: any
): Promise<User> => {
  const { data } = await httpClient.post<User>(`/users/${uid}`, payload);
  return data;
};

const getUsersByOrg = async (orgId: string): Promise<User[]> => {
  const { data } = await httpClient.get<User[]>(`/org/${orgId}/users`);
  return data;
};

const updateRole = async (userId: string, payload: any): Promise<User> => {
  const { data } = await httpClient.patch<User>(`/users/${userId}`, payload);
  return data;
};

const removeUserFromCorporation = async (userId: string): Promise<User> => {
  const { data } = await httpClient.delete<User>(`/users/${userId}`);
  return data;
};

const getSheetsByUser = async () => {
  const { data } = await httpClient.get(`/users/userId/sheets`);
  return data;
};

export {
  getUsersByOrg,
  updateRole,
  removeUserFromCorporation,
  createUser,
  getSheetsByUser,
  createUserWithGoogle,
};
