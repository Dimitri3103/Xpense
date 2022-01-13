import { httpClient } from "../utils/httpClient";
import Currency from "../models/currency";

const getCurrencies = async (): Promise<Currency[]> => {
  const { data } = await httpClient.get<Currency[]>(`/currencies`);
  return data;
};
export { getCurrencies };
