import Role from '../../models/role';
import roleRepository from '../../repositories/roleRepository';

export default  async () : Promise<Role[]> => {
    return await roleRepository.list();
}
