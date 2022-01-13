import roleRepository from '../../repositories/roleRepository';

const getRole = async (roleName: string) => {
    return await roleRepository.getRole(roleName);
}
export default getRole;