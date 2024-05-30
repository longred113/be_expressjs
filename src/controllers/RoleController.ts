import { Request, Response } from "express";
import { SendResponse } from "../service/success/success";
import { RoleUseCase } from "../usecase/RoleUseCase";
import { RestError } from "../service/error/error";

export class RoleController {
    constructor(private roleUseCase: RoleUseCase) { }
    public getAllRole = async (req: Request, res: Response) => {
        try {
            const roles = await this.roleUseCase.findAllRole();
            return new SendResponse({ data: roles, message: "All Roles" }).send(res);
        } catch (error) {
            return RestError.manageServerError(res, error, false);
        }
    }

    public createNewRole = async (req: Request, res: Response) => {
        try {
            const { name } = req.body;
            const newRole = await this.roleUseCase.createRole(name);
            return new SendResponse({ data: newRole, message: "Create new role successfully!" }).send(res);
        } catch (error) {
            return RestError.manageServerError(res, error, false);
        }
    }
}