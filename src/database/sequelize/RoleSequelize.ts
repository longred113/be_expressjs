import { RoleInterface } from "../../interface/RoleInterface";
import { IRoleRepository } from "../../repository/roleRepository";
import { RoleModel } from "../model/RoleModel"

export class RoleSequelize implements IRoleRepository {
    async createRole(name: string): Promise<RoleInterface> {
        const role = await RoleModel.create({ name });
        return role;
    }

    async findAllRoles(): Promise<RoleInterface[]> {
        const roles = await RoleModel.findAll();
        return roles
    }

    async findRoleById(roleId: number): Promise<RoleInterface | null> {
        const role = await RoleModel.findByPk(roleId);
        return role;
    }

    async updateRole(name: string, roleId: number): Promise<void> {
        await RoleModel.update(
            { name },
            {
                where: {
                    id: roleId
                }
            }
        );
        return;
    }
}