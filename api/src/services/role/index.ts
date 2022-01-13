import Role from "../../models/role";
import roleRepository from "../../repositories/roleRepository";

const all = async (name?: string) : Promise<Role[]> => {
    return await roleRepository.list(name);
}

export {
    all
};
