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

}