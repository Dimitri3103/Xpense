import http from "../../utils/http-common";

const getOrgConfig = (orgId) => {
  try {
    return http.get(`/organisations/${orgId}`);
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export { getOrgConfig };
