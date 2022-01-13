import { httpClient } from "../../utils/httpClient";
import Tax from "../../models/tax";

const getTaxes = async (orgId: string): Promise<Tax[]> => {
  const { data } = await httpClient.get<Tax[]>(`/org/${orgId}/taxes`);
  return data;
};

const getTax = async (orgId: string, taxId: string): Promise<Tax> => {
  const { data } = await httpClient.get<Tax>(`/org/${orgId}/taxes/${taxId}`);
  return data;
};

const createTax = async (orgId: string, payload: any): Promise<Tax> => {
  const { data } = await httpClient.post<Tax>(`/org/${orgId}/taxes`, payload);
  return data;
};

const updateTax = async (
  orgId: string,
  taxId: string,
  payload: any
): Promise<Tax> => {
  const { data } = await httpClient.put<Tax>(
    `/org/${orgId}/taxes/${taxId}`,
    payload
  );
  return data;
};

const deleteTax = async (orgId: string, taxId: string): Promise<Tax> => {
  const { data } = await httpClient.delete<Tax>(`/org/${orgId}/taxes/${taxId}`);
  return data;
};

export { getTaxes, getTax, createTax, updateTax, deleteTax };
