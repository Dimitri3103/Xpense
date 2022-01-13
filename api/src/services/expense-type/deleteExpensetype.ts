import expenseTypeRepository from '../../repositories/expenseTypeRepository';

export default async (expenseTypeId: string, rev: string) => {
    await expenseTypeRepository.delete(expenseTypeId, rev);
}