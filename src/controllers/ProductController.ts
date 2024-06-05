import { Request, Response } from "express";
import { RestError } from "../service/error/error";
import { ProductUseCase } from "../usecase/ProductUseCase";
import { SendResponse } from "../service/success/success";
import multer from "multer";
import { UploadToCloudinary } from "../utils/UploadImage";
import { ProductModel } from "../database/model/ProductModel";

export class ProductController {
    constructor(private productUseCase: ProductUseCase) { }
    public findAllProduct = async (req: Request, res: Response) => {
        try {
            const products = await this.productUseCase.getProducts();
            return new SendResponse({ data: products, message: "All Products" }).send(res);
        } catch (error) {
            return RestError.manageServerError(res, error, false);
        }
    }
    public createProduct = async (req: Request, res: Response) => {
        try {
            const files = req.files as Express.Multer.File[];
            const image = await UploadToCloudinary(files, res);
            const product = await this.productUseCase.createProduct(req.body, image);
            return new SendResponse({ data: product, message: "Create new product successfully!" }).send(res);
        } catch (error) {
            return RestError.manageServerError(res, error, false);
        }
    }

    public findProductByCategory = async (req: Request, res: Response) => {
        try {
            const { categoryId } = req.params;
            const products = await this.productUseCase.getProductByCategoryId(parseInt(categoryId, 10));
            return new SendResponse({ data: products, message: "Product find by category" }).send(res);
        } catch (error) {
            return RestError.manageServerError(res, error, false);
        }
    }
}