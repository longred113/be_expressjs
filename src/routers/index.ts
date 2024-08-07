import { AddressRouter } from "./carts/AddressRouter";
import { CartRouter } from "./carts/CartRouter";
import { CategoryRouter } from "./products/CategoryRouter";
import { ProductRouter } from "./products/ProductRouter";
import { RoleRouter } from "./users/RoleRouter";
import { UsersRouter } from "./users/UserRouter";
import { Router } from 'express';


export class Routes {
    public usersRouter: UsersRouter = new UsersRouter();
    public roleRouter: RoleRouter = new RoleRouter();
    public categoryRouter: CategoryRouter = new CategoryRouter();
    public productRouter: ProductRouter = new ProductRouter();
    public cartRouter: CartRouter = new CartRouter();
    public addressRouter: AddressRouter = new AddressRouter();

    public routes(app: Router): Router {
        this.usersRouter.router(app);
        this.roleRouter.router(app);
        this.categoryRouter.router(app);
        this.productRouter.router(app);
        this.cartRouter.router(app);
        this.addressRouter.router(app);
        return Router();
    }
}