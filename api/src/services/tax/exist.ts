import taxRepository from "../../repositories/taxRepository";

export default async (taxId: string): Promise<boolean> => {
  const tax = await taxRepository.getById(taxId);
  return tax != null;
};
