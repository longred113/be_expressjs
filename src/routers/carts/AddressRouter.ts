import { Router } from "express";
import { AddressController } from "../../controllers/AddressController";
import { AddressSequelize } from "../../database/sequelize/AddressSequelize";
import { VerifyTokenMiddleware } from "../../middlewares/auth/VerifyTokenMiddleware";
import { AddressUseCase } from "../../usecase/AddressUseCase";

const BASE_ROUTE = '/address';

enum Routes {
    GET_ALL = '/get-all',
}
export class AddressRouter {
    private verifyTokenMiddleware: VerifyTokenMiddleware = new VerifyTokenMiddleware();
    private addressSequelize: AddressSequelize = new AddressSequelize();
    private addressUseCase: AddressUseCase = new AddressUseCase(this.addressSequelize);
    private addressController: AddressController = new AddressController(this.addressUseCase);

    public router(app: Router): void {
        app.get(BASE_ROUTE + Routes.GET_ALL, this.addressController.getAll);
    }
}