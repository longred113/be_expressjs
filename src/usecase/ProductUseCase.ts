import { ProductInterface } from "../interface/ProductInterface";
import { IProductRepository } from "../repository/productRepository";

export class ProductUseCase {
    constructor(private productRepository: IProductRepository) { }

    createProduct(reqBody: ProductInterface): Promise<ProductInterface> {
        return this.productRepository.createProduct(reqBody);
    }

    getProducts(): Promise<ProductInterface[]> {
        return this.productRepository.getProducts();
    }
}