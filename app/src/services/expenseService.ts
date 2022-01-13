import http from "../utils/http-common";

const getExpense = (expenseId) => {
  try {
    return http.get(`/expenses/${expenseId}`);
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const getExpenses = () => {
  try {
    return http.get("/expenses");
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const updateExpense = (expenseId, data) => {
  return http.put(`/expenses/${expenseId}`, data);
};

const createExpense = (data) => {
  return http.post("/expenses", data);
};

const deleteExpense = (expenseId) => {
  return http.delete(`/expenses/${expenseId}`);
};

export { getExpense, getExpenses, updateExpense, createExpense, deleteExpense };
