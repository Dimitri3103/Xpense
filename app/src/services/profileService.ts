import http from "../utils/http-common";

const getProfile = (userId) => {
  try {
    return http.get(`/profiles/${userId}`);
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const updateProfile = (userId, data) => {
  return http.put(`/profiles/${userId}`, data);
};

export { getProfile, updateProfile };
