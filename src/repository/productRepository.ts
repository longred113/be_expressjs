import { ProductInterface } from "../interface/ProductInterface";

export interface IProductRepository {
    createProduct(reqBody: ProductInterface): Promise<ProductInterface>;
    getProducts(): Promise<ProductInterface[]>;
    // getProductById(id: number): Promise<ProductInterface>;
    // updateProduct(product: ProductInterface): Promise<ProductInterface>;
    // deleteProduct(id: number): Promise<ProductInterface>;
}