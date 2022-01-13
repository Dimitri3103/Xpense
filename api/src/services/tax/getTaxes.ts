import Tax from "../../models/tax";
import taxRepository from "../../repositories/taxRepository";

export default async (orgId?: string): Promise<Tax[]> => {
  return await taxRepository.list(orgId);
};
