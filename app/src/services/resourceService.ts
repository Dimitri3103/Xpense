import http from "../utils/http-common";

const getCurrencies = () => {
  try {
    return http.get("/currencies");
  } catch (e) {
    console.error(e);
    throw e;
  }
};
export { getCurrencies };
