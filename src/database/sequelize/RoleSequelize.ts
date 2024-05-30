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
}