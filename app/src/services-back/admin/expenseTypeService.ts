import { httpClient } from "../../utils/httpClient";
import ExpenseType from "../../models/expenseType";

const getExpenseTypes = async (orgId: string): Promise<ExpenseType[]> => {
  const { data } = await httpClient.get<ExpenseType[]>(
    `/org/${orgId}/exp-types`
  );
  return data;
};

const getExpenseType = async (
  orgId: string,
  expenseTypeId: string
): Promise<ExpenseType> => {
  const { data } = await httpClient.get<ExpenseType>(
    `/org/${orgId}/exp-types/${expenseTypeId}`
  );
  return data;
};

const createExpenseType = async (
  orgId: string,
  payload: any
): Promise<ExpenseType> => {
  const { data } = await httpClient.post<ExpenseType>(
    `/org/${orgId}/exp-types`,
    payload
  );
  return data;
};

const updateExpenseType = async (
  orgId: string,
  expenseTypeId: string,
  payload: any
): Promise<ExpenseType> => {
  const { data } = await httpClient.put<ExpenseType>(
    `/org/${orgId}/exp-types/${expenseTypeId}`,
    payload
  );
  return data;
};

const deleteExpenseType = async (
  orgId: string,
  expenseTypeId: string
): Promise<ExpenseType> => {
  const { data } = await httpClient.delete<ExpenseType>(
    `/org/${orgId}/exp-types/${expenseTypeId}`
  );
  return data;
};

export {
  getExpenseType,
  getExpenseTypes,
  createExpenseType,
  updateExpenseType,
  deleteExpenseType,
};
