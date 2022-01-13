import http from "../../utils/http-common";

const getGroups = () => {
  try {
    return http.get("/groups");
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const getGroup = (groupId) => {
  try {
    return http.get(`/groups/${groupId}`);
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const createGroup = (data) => {
  return http.post("/groups", data);
};

const updateGroup = (groupId, data) => {
  return http.put(`/groups/${groupId}`, data);
};

const deleteGroup = (groupId) => {
  return http.delete(`/groups/${groupId}`);
};

const addUserToGroup = (groupId, data) => {
  return http.patch(`/groups/${groupId}/members`, data);
};

const removeUserFromGroup = (groupId, userId) => {
  return http.delete(`/groups/${groupId}/members/${userId}`);
};

const assignExpenseTypesToGroup = (groupId, data) => {
  return http.patch(`/groups/${groupId}/expense-types`, data);
};

export {
  getGroups,
  createGroup,
  deleteGroup,
  updateGroup,
  getGroup,
  assignExpenseTypesToGroup,
  addUserToGroup,
  removeUserFromGroup,
};
