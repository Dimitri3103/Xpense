import http from "../utils/http-common";

const getSheets = () => {
  try {
    return http.get("/sheets");
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const getSheet = (sheetId) => {
  try {
    return http.get(`/sheets/${sheetId}`);
  } catch (e) {
    console.error(e);
    throw e;
  }
};
export { getSheets, getSheet };
