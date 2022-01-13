import http from "../../utils/http-common";

const getExpenseTypes = () => {
  try {
    return http.get("/expenseTypes");
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const getExpenseType = (expenseTypeId) => {
  try {
    return http.get(`/expenseTypes/${expenseTypeId}`);
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export { getExpenseType, getExpenseTypes };
