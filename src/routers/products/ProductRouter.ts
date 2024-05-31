import { Router } from "express";
import { VerifyTokenMiddleware } from "../../middlewares/auth/VerifyTokenMiddleware";
import { ProductUseCase } from "../../usecase/ProductUseCase";
import { ProductSequelize } from "../../database/sequelize/ProductSequelize";
import { ProductController } from "../../controllers/ProductController";

const BASE_ROUTE = '/product';

enum Routes {
    GET_ALL = '/get-all',
    CREATE = '/create',
    // GET_CATEGORY_BY_ID = '/get-category/:categoryId',
}
export class ProductRouter {
    private verifyTokenMiddleware: VerifyTokenMiddleware = new VerifyTokenMiddleware();
    private productSequelize: ProductSequelize = new ProductSequelize();
    private productUseCase: ProductUseCase = new ProductUseCase(this.productSequelize);
    private productController: ProductController = new ProductController(this.productUseCase);
    public router(app: Router): void {
        app.get(BASE_ROUTE + Routes.GET_ALL, this.verifyTokenMiddleware.authenticate, this.verifyTokenMiddleware.permissionsRoleAdmin, this.productController.findAllProduct);
        // app.post(BASE_ROUTE + Routes.CREATE, this.verifyTokenMiddleware.authenticate, this.verifyTokenMiddleware.permissionsRoleAdmin, this.productController.createCategory);
        // app.get(BASE_ROUTE + Routes.GET_CATEGORY_BY_ID, this.verifyTokenMiddleware.authenticate, this.verifyTokenMiddleware.permissionsRoleAdmin, this.categoryController.findCategoryById);
    }
}