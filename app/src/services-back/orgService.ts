import { httpClient } from "../utils/httpClient";
import Org from "../models/organization";

const getOrgs = async (): Promise<Org[]> => {
  const { data } = await httpClient.get<Org[]>(`/org`);
  return data;
};

const getUserOrganization = async (): Promise<Org> => {
  const { data } = await httpClient.get<Org>(`/org`);
  return data;
};
export { getOrgs, getUserOrganization };
