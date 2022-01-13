import {CouchDbRepository} from "./couchDbRepository";
import Role from "../models/role";
import {FirebaseUser} from "../models/user";
import {plainToClass} from "class-transformer";

class RoleRepository extends CouchDbRepository {
    constructor() {
        super()
    }
    public async list(id = "sys:role"): Promise<Role[]> {
        const result = await this.db.view<Role>('role', 'list')
        return result.rows.map(({value}) => value)
    }
    public async getRole(name?: string): Promise<Role[]> {
        const result = await this.db.view<Role>('role', 'list', { key: name})
        return result.rows.map(({value}) => value)
    }
    public async changeRole(id: string, roleName: string){
        console.table(roleName);
        return await this.db.atomic('role', 'upsert', id, roleName)
    }
    public async getUserRole(userId: string, roleName: string): Promise<FirebaseUser[]> {
        let result = await this.db.view<FirebaseUser>('role', 'list' ,{ key: [roleName, userId]})
        console.table(result);
        return plainToClass(
            FirebaseUser,
            result.rows.map(({ value }) => value));
    }
}
export default new RoleRepository();
