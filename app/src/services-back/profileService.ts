import { httpClient } from "../utils/httpClient";

const getProfile = async () => {
  const { data } = await httpClient.get(`/profile`);
  return data;
};

const updateProfile = async (payload: any) => {
  const { data } = await httpClient.put(`/profile`, payload);
  return data;
};

export { getProfile, updateProfile };
