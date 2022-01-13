import http from "../../utils/http-common";

const getTaxes = () => {
  try {
    return http.get("/taxes");
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export { getTaxes };
