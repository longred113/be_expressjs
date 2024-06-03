import { ProductInterface } from "../../interface/ProductInterface";
import { IProductRepository } from "../../repository/productRepository";
import { CategoryModel } from "../model/CategoryModel";
import { ProductModel } from "../model/ProductModel";

export class ProductSequelize implements IProductRepository {
    async createProduct(reqBody: ProductInterface): Promise<ProductInterface> {
        console.log(reqBody);
        const { name, description, price, inventory_number, producer, categoryId, image } = reqBody;
        const product = await ProductModel.create({
            name, description, price, inventory_number, producer, categoryId, image
        });

        return product;
    }

    async getProducts(): Promise<ProductInterface[]> {
        return await ProductModel.findAll({
            include: [{
                model: CategoryModel,
                as: 'category',
                attributes: ['name']
            }]
        });
    }

    async getProductByCategory(categoryId: number): Promise<ProductInterface[]> {
        return await ProductModel.findAll({
            include: [{
                model: CategoryModel,
                as: 'category',
                attributes: ['name']
            }],
            where: {
                categoryId: categoryId
            }
        });
    }
}