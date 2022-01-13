import taxRepository from "../../repositories/taxRepository";

export default async (taxId: string, rev: string) => {
  await taxRepository.delete(taxId, rev);
};
