import { Request, Response } from "express";
import { RestError } from "../service/error/error";
import { ProductUseCase } from "../usecase/ProductUseCase";
import { SendResponse } from "../service/success/success";

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

        } catch (error) {
            return RestError.manageServerError(res, error, false);
        }
    }
}