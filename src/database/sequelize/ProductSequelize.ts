import { ProductInterface } from "../../interface/ProductInterface";
import { IProductRepository } from "../../repository/productRepository";

export class ProductSequelize implements IProductRepository {
    async createProduct(reqBody: ProductInterface): Promise<ProductInterface> {
        return reqBody
    }

    async getProducts(): Promise<ProductInterface[]> {
        return []
    }
}