import ExpenseType from '../../models/expenseType';
import expenseTypeRepository, {CreateExpenseTypeProps} from '../../repositories/expenseTypeRepository';

export default async (expenseType: CreateExpenseTypeProps) : Promise<ExpenseType> => {
    return await expenseTypeRepository.create(expenseType);
}
