import http from "../../utils/http-common";

const getRoles = () => {
  try {
    return http.get("/roles");
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export { getRoles };
