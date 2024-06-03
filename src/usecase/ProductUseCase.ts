import { ProductInterface } from "../interface/ProductInterface";
import { IProductRepository } from "../repository/productRepository";

export class ProductUseCase {
    constructor(private productRepository: IProductRepository) { }

    createProduct(reqBody: any, image: any): Promise<any> {
        const params = {
            name: reqBody.name,
            description: {
                "CPU": reqBody.CPU,
                "RAM": reqBody.ram,
                "VGA": reqBody.graphics_card,
                "Hard_drive": reqBody.hard_drive,
                "display": reqBody.display
            },
            price: reqBody.price,
            inventory_number: reqBody.inventory_number,
            producer: reqBody.producer,
            image: image,
            categoryId: reqBody.categoryId
        }
        return this.productRepository.createProduct(params);
    }

    getProducts(): Promise<ProductInterface[]> {
        return this.productRepository.getProducts();
    }

    getProductByCategoryId(categoryId: number): Promise<ProductInterface[]> {
        return this.productRepository.getProductByCategory(categoryId);
    }
}