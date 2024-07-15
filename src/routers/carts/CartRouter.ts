import { Router } from "express";
import { CartSequelize } from "../../database/sequelize/CartSequelize";
import { CartUseCase } from "../../usecase/CartUseState";
import { CartController } from "../../controllers/CartController";
import { VerifyTokenMiddleware } from "../../middlewares/auth/VerifyTokenMiddleware";
import { ValidateValuesMiddleware } from "../../middlewares/validator/ValidateValue";

const BASE_ROUTE = '/cart';

enum Routes {
    CREATE = '/create',
    GET_CART = '/get-cart',
    ADD_TO_CART = '/add-to-cart',
}
export class CartRouter {
    private verifyTokenMiddleware: VerifyTokenMiddleware = new VerifyTokenMiddleware();
    private cartSequelize: CartSequelize = new CartSequelize();
    private cartUseCase: CartUseCase = new CartUseCase(this.cartSequelize);
    private cartController: CartController = new CartController(this.cartUseCase);
    public router(app: Router): void {
        app.post(BASE_ROUTE + Routes.CREATE, this.cartController.createCart);
        app.get(BASE_ROUTE + Routes.GET_CART, this.verifyTokenMiddleware.authenticate, this.cartController.getCartUser);
        app.post(BASE_ROUTE + Routes.ADD_TO_CART, this.verifyTokenMiddleware.authenticate, this.cartController.addToCart);
    }
}