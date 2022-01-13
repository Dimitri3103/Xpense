import userRepository, { ChangeUserRole } from '../../repositories/userRepository';

const assignRolesToUser = async (userId: string, roleName: ChangeUserRole) => {
    await userRepository.changeRole(userId, roleName);
}

export default assignRolesToUser;