import { httpClient } from "../utils/httpClient";
import { Expense } from "../models/expense";

const getExpense = async (
  sheetId: string,
  expenseId: string
): Promise<Expense> => {
  const { data } = await httpClient.get<Expense>(
    `/sheets/${sheetId}/expenses/${expenseId}`
  );
  return data;
};

const getExpenses = async (sheetId: string): Promise<Expense[]> => {
  const { data } = await httpClient.get<Expense[]>(
    `/sheets/${sheetId}/expenses`
  );
  return data;
};

const updateExpense = async (
  sheetId: string,
  expenseId: string,
  payload: any
): Promise<Expense> => {
  const { data } = await httpClient.put<Expense>(
    `/sheets/${sheetId}/expenses/${expenseId}`,
    payload
  );
  return data;
};

const createExpense = async (
  sheetId: string,
  payload: any
): Promise<Expense> => {
  const { data } = await httpClient.post<Expense>(
    `/sheets/${sheetId}/expenses`,
    payload
  );
  return data;
};

const deleteExpense = async (
  sheetId: string,
  expenseId: string
): Promise<Expense> => {
  const { data } = await httpClient.delete<Expense>(
    `/sheets/${sheetId}/expenses/${expenseId}`
  );
  return data;
};

const insertAttachment = async (sheetId: string, expenseId: string, file) => {
  let formData = new FormData();
  formData.append("file", file);
  const { data } = await httpClient.uploadFile(
    `/sheets/${sheetId}/expenses/${expenseId}/attachment`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return data;
};

export {
  getExpense,
  getExpenses,
  updateExpense,
  createExpense,
  deleteExpense,
  insertAttachment,
};
