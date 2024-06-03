import { ProductInterface } from "../interface/ProductInterface";

export interface IProductRepository {
    createProduct(reqBody: any): Promise<ProductInterface>;
    getProducts(): Promise<ProductInterface[]>;
    getProductByCategory(categoryId: number): Promise<any>
    // updateProduct(product: ProductInterface): Promise<ProductInterface>;
    // deleteProduct(id: number): Promise<ProductInterface>;
}