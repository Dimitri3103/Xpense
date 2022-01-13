import sheetRepository from "../../repositories/sheetRepository";

export default async (sheetId: string, rev: string) => {
  await sheetRepository.delete(sheetId, rev);
};
