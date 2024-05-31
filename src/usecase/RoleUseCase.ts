import { RoleInterface } from "../interface/RoleInterface";
import { IRoleRepository } from "../repository/roleRepository";

export class RoleUseCase {

    constructor(private roleRepository: IRoleRepository) { }

    async createRole(name: string): Promise<RoleInterface> {
        return await this.roleRepository.createRole(name);
    }

    async findAllRole(): Promise<RoleInterface[]> {
        const roles = await this.roleRepository.findAllRoles();
        return roles;
    }

    async findRoleById(roleId: number): Promise<RoleInterface | null> {
        const role = await this.roleRepository.findRoleById(roleId);
        return role;
    }

    async adminUpdateRole(name: string, roleId: number): Promise<void> {
        return await this.roleRepository.updateRole(name, roleId);
    }
}