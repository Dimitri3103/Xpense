import Tax from '../../models/tax';
import taxRepository, {CreateTaxProps} from '../../repositories/taxRepository';

export default async (tax: CreateTaxProps) : Promise<Tax> => {
    return await taxRepository.create(tax);
}
