import expenseTypeRepository, {
  CreateExpenseTypeProps,
} from "../../repositories/expenseTypeRepository";

export default async (
  id: string,
  expenseType: CreateExpenseTypeProps
): Promise<void> => {
  await expenseTypeRepository.edit(id, expenseType);
};
