import taxRepository from '../../repositories/taxRepository';
import Tax from '../../models/tax';

export default async (taxId: string): Promise<Tax | null | undefined> => {
    return await taxRepository.getById(taxId);
}