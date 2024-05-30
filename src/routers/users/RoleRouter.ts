import { Router } from "express";
import { RoleSequelize } from "../../database/sequelize/RoleSequelize";
import { RoleUseCase } from "../../usecase/RoleUseCase";
import { RoleController } from "../../controllers/RoleController";
import { VerifyTokenMiddleware } from "../../middlewares/auth/VerifyTokenMiddleware";
import { ValidateValuesMiddleware } from "../../middlewares/validator/ValidateValue";

const BASE_ROUTE = '/role';

enum Routes {
    GET_ALL = '/get-all',
    CREATE = '/create',
}
export class RoleRouter {
    private roleSequelize: RoleSequelize = new RoleSequelize();
    private roleUseCase: RoleUseCase = new RoleUseCase(this.roleSequelize);
    private roleController: RoleController = new RoleController(this.roleUseCase);
    private verifyTokenMiddleware: VerifyTokenMiddleware = new VerifyTokenMiddleware();
    private validateValue: ValidateValuesMiddleware = new ValidateValuesMiddleware();

    public router(app: Router): void {
        app.get(BASE_ROUTE + Routes.GET_ALL, this.verifyTokenMiddleware.authenticate, this.roleController.getAllRole)
        app.post(BASE_ROUTE + Routes.CREATE, this.verifyTokenMiddleware.authenticate, this.roleController.createNewRole);
    }
}