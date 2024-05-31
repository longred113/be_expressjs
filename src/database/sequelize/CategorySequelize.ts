import { CategoryInterface } from "../../interface/CategoryInterface";
import { ICategoryRepository } from "../../repository/categoryRepository";
import { CategoryModel } from "../model/CategoryModel";

export class CategorySequelize implements ICategoryRepository {

    async createCategory(name: string): Promise<any> {
        return await CategoryModel.create({ name });
    }

    async findAllCategories(): Promise<any> {
        return await CategoryModel.findAll();
    }

    async findCategoryById(categoryId: number): Promise<any> {
        const role = await CategoryModel.findByPk(categoryId);
        return role;
    }
}