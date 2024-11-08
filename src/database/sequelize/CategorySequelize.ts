import { CategoryInterface } from "../../interface/CategoryInterface";
import { ICategoryRepository } from "../../repository/categoryRepository";
import { CategoryModel } from "../model/CategoryModel";
import { ChildCateModel } from "../model/ChildCateModel";

export class CategorySequelize implements ICategoryRepository {

    async createCategory(name: string): Promise<any> {
        return await CategoryModel.create({ name });
    }

    async findAllCategories(): Promise<any> {
        return await CategoryModel.findAll(
            {
                include: [{
                    model: ChildCateModel,
                    as: 'childCates',
                }]
            }
        );
    }

    async findCategoryById(categoryId: number): Promise<any> {
        const role = await CategoryModel.findByPk(categoryId);
        return role;
    }

    async updateCategory(name: string, categoryId: number): Promise<any> {
        const category = await CategoryModel.update(
            { name },
            { where: { id: categoryId } }
        );
        return category;
    }

    async deleteCategory(categoryIds: number[]): Promise<any> {
        return await CategoryModel.destroy({ where: { id: categoryIds } });
    }
}