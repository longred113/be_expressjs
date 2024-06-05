import { Router } from "express";
import { VerifyTokenMiddleware } from "../../middlewares/auth/VerifyTokenMiddleware";
import { ValidateValuesMiddleware } from "../../middlewares/validator/ValidateValue";
import { CategorySequelize } from "../../database/sequelize/CategorySequelize";
import { CategoryUseCase } from "../../usecase/CategoryUseCase";
import { CategoryController } from "../../controllers/CategoryController";

const BASE_ROUTE = '/category';

enum Routes {
    GET_ALL = '/get-all',
    CREATE = '/create',
    GET_CATEGORY_BY_ID = '/get-category/:categoryId',
    UPDATE_CATEGORY = '/update/:categoryId',
    DELETE = '/delete'
}
export class CategoryRouter {
    private verifyTokenMiddleware: VerifyTokenMiddleware = new VerifyTokenMiddleware();
    private categorySequelize: CategorySequelize = new CategorySequelize()
    private categoryUseCase: CategoryUseCase = new CategoryUseCase(this.categorySequelize);
    private categoryController: CategoryController = new CategoryController(this.categoryUseCase);
    public router(app: Router): void {
        app.get(BASE_ROUTE + Routes.GET_ALL, this.verifyTokenMiddleware.authenticate, this.verifyTokenMiddleware.permissionsRoleAdmin, this.categoryController.findAllCategory);
        app.post(BASE_ROUTE + Routes.CREATE, this.verifyTokenMiddleware.authenticate, this.verifyTokenMiddleware.permissionsRoleAdmin, this.categoryController.createCategory);
        app.get(BASE_ROUTE + Routes.GET_CATEGORY_BY_ID, this.verifyTokenMiddleware.authenticate, this.verifyTokenMiddleware.permissionsRoleAdmin, this.categoryController.findCategoryById);
        app.post(BASE_ROUTE + Routes.UPDATE_CATEGORY, this.verifyTokenMiddleware.authenticate, this.verifyTokenMiddleware.permissionsRoleAdmin, this.categoryController.updateCategory);
        app.delete(BASE_ROUTE + Routes.DELETE, this.verifyTokenMiddleware.authenticate, this.verifyTokenMiddleware.permissionsRoleAdmin, this.categoryController.deleteCategory);
    }
}