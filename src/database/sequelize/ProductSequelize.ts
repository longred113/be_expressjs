import { ProductInterface } from "../../interface/ProductInterface";
import { IProductRepository } from "../../repository/productRepository";
import { CategoryModel } from "../model/CategoryModel";
import { ProductModel } from "../model/ProductModel";

export class ProductSequelize implements IProductRepository {
    async createProduct(reqBody: ProductInterface): Promise<ProductInterface> {
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

    async getProductDetail(productName: string): Promise<ProductInterface | null> {
        const product = await ProductModel.findOne({
            where: { name: productName },
            include: [{
                model: CategoryModel,
                as: 'category',
                attributes: ['name']
            }]
        });
        console.log(product);
        return product;
    }
}