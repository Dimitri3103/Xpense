import expenseRepository, {
  CreateExpenseProps,
} from "../../repositories/expenseRepository";

export default async (
  id: string,
  expense: CreateExpenseProps
): Promise<void> => {
  await expenseRepository.update(id, expense);
};
