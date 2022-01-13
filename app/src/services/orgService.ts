import http from "../utils/http-common";

const getOrgs = async () => {
  try {
    return http.get("/organisations");
  } catch (e) {
    console.error(e);
    throw e;
  }
};
export { getOrgs };
