
import { RoleInterface } from "../interface/RoleInterface";

export interface IRoleRepository {
    createRole(name: string): Promise<RoleInterface>
    findAllRoles(): Promise<RoleInterface[]>
}