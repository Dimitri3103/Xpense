import expenseTypeRepository from '../../repositories/expenseTypeRepository';

export default async (expenseTypeId: string) : Promise<boolean> => {
    const expenseType=  await expenseTypeRepository.getById(expenseTypeId);
    return expenseType != null;
}