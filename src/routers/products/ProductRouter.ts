import { Router } from "express";
import { VerifyTokenMiddleware } from "../../middlewares/auth/VerifyTokenMiddleware";
import { ProductUseCase } from "../../usecase/ProductUseCase";
import { ProductSequelize } from "../../database/sequelize/ProductSequelize";
import { ProductController } from "../../controllers/ProductController";
import multer from "multer";

const BASE_ROUTE = '/product';

enum Routes {
    GET_ALL = '/get-all',
    CREATE = '/create',
    GET_PRODUCT_BY_CATEGORY = '/get-by-category/:categoryId',
    GET_PRODUCT_BY_NAME = '/:productName',
}
const storage = multer.memoryStorage();  // Lưu trữ file trong bộ nhớ tạm thời
const upload = multer({ storage: storage });

export class ProductRouter {
    private verifyTokenMiddleware: VerifyTokenMiddleware = new VerifyTokenMiddleware();
    private productSequelize: ProductSequelize = new ProductSequelize();
    private productUseCase: ProductUseCase = new ProductUseCase(this.productSequelize);
    private productController: ProductController = new ProductController(this.productUseCase);
    public router(app: Router): void {
        app.get(BASE_ROUTE + Routes.GET_ALL, this.productController.findAllProduct);
        app.post(BASE_ROUTE + Routes.CREATE, this.verifyTokenMiddleware.authenticate, this.verifyTokenMiddleware.permissionsRoleAdmin, upload.array('image', 10), this.productController.createProduct);
        app.get(BASE_ROUTE + Routes.GET_PRODUCT_BY_CATEGORY, this.productController.findProductByCategory);
        app.get(BASE_ROUTE + Routes.GET_PRODUCT_BY_NAME, this.productController.getProductDetail);
    }
}