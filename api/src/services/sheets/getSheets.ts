import Sheet from "../../models/sheet";
import sheetRepository from "../../repositories/sheetRepository";

export default async (orgId: string): Promise<Sheet[]> => {
  return await sheetRepository.find(orgId);
};
