import taxRepository, {
  CreateTaxProps,
} from "../../repositories/taxRepository";

export default async (id: string, tax: CreateTaxProps): Promise<void> => {
  await taxRepository.edit(id, tax);
};
