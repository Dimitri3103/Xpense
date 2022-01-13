import http from "../../utils/http-common";

const getUsers = () => {
  try {
    return http.get("/users");
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const getUser = (userId) => {
  try {
    return http.get(`/users/${userId}`);
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export { getUsers, getUser };
