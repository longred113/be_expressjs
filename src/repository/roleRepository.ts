
import { RoleInterface } from "../interface/RoleInterface";

export interface IRoleRepository {
    createRole(name: string): Promise<RoleInterface>
    findAllRoles(): Promise<RoleInterface[]>
    findRoleById(roleId: number): Promise<RoleInterface | null>
    updateRole(name: string, roleId: number): Promise<void>
}