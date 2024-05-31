import { CategoryInterface } from "../interface/CategoryInterface";
import { ICategoryRepository } from "../repository/categoryRepository";

export class CategoryUseCase {
    constructor(private categoryRepository: ICategoryRepository) { }

    async createCategory(name: string): Promise<CategoryInterface> {
        return await this.categoryRepository.createCategory(name);
    }

    async findAllCategories(): Promise<CategoryInterface[]> {
        return await this.categoryRepository.findAllCategories();
    }

    async findCategoryById(categoryId: number): Promise<CategoryInterface> {
        return await this.categoryRepository.findCategoryById(categoryId);
    }
}