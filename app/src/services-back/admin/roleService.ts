import { httpClient } from "../../utils/httpClient";
import Role from "../../models/role";

const getRoles = async (): Promise<Role[]> => {
  const { data } = await httpClient.get<Role[]>(`/roles`);
  return data;
};

const getRole = async (roleId: string): Promise<Role> => {
  const { data } = await httpClient.get<Role>(`/roles/${roleId}`);
  return data;
};

export { getRoles, getRole };
