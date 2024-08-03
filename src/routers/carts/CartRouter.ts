import { Router } from "express";
import { CartSequelize } from "../../database/sequelize/CartSequelize";
import { CartUseCase } from "../../usecase/CartUseState";
import { CartController } from "../../controllers/CartController";
import { VerifyTokenMiddleware } from "../../middlewares/auth/VerifyTokenMiddleware";
import { ValidateValuesMiddleware } from "../../middlewares/validator/ValidateValue";
import { ProductSequelize } from "../../database/sequelize/ProductSequelize";
import { ProductUseCase } from "../../usecase/ProductUseCase";

const BASE_ROUTE = '/cart';

enum Routes {
    CREATE = '/create',
    GET_CART = '/get-cart',
    ADD_TO_CART = '/add-to-cart',
    DELETE_CART = '/delete',
}
export class CartRouter {
    private verifyTokenMiddleware: VerifyTokenMiddleware = new VerifyTokenMiddleware();
    private cartSequelize: CartSequelize = new CartSequelize();
    private cartUseCase: CartUseCase = new CartUseCase(this.cartSequelize);
    private productSequelize: ProductSequelize = new ProductSequelize();
    private productUseCase: ProductUseCase = new ProductUseCase(this.productSequelize);
    private cartController: CartController = new CartController(this.cartUseCase, this.productUseCase);

    public router(app: Router): void {
        app.post(BASE_ROUTE + Routes.CREATE, this.cartController.createCart);
        app.get(BASE_ROUTE + Routes.GET_CART, this.verifyTokenMiddleware.authenticate, this.cartController.getCartUser);
        app.post(BASE_ROUTE + Routes.ADD_TO_CART, this.verifyTokenMiddleware.authenticate, this.cartController.addToCart);
        app.delete(BASE_ROUTE + Routes.DELETE_CART, this.verifyTokenMiddleware.authenticate, this.cartController.deleteCart);
    }
}