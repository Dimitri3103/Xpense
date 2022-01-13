import { httpClient } from "../utils/httpClient";
import { Sheet } from "../models/sheet";

const getSheets = async (orgId: string): Promise<Sheet[]> => {
  const { data } = await httpClient.get<Sheet[]>(`/org/${orgId}/sheets`);
  return data;
};

const getSheet = async (orgId: string, sheetId: string): Promise<Sheet> => {
  const { data } = await httpClient.get<Sheet>(
    `/org/${orgId}/sheets/${sheetId}`
  );
  return data;
};

const createSheet = async (orgId: string, payload: any): Promise<Sheet> => {
  const { data } = await httpClient.post<Sheet>(
    `/org/${orgId}/sheets`,
    payload
  );

  return data;
};

const updateSheet = async (
  orgId: string,
  sheetId: string,
  payload: any
): Promise<Sheet> => {
  const { data } = await httpClient.put<Sheet>(
    `/org/${orgId}/sheets/${sheetId}`,
    payload
  );

  return data;
};

const deleteSheet = async (orgId: string, sheetId: string): Promise<Sheet> => {
  const { data } = await httpClient.delete<Sheet>(
    `/org/${orgId}/sheets/${sheetId}`
  );
  return data;
};

export { getSheets, createSheet, getSheet, updateSheet, deleteSheet };
