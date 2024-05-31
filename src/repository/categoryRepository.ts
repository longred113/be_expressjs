import { CategoryInterface } from "../interface/CategoryInterface";

export interface ICategoryRepository {
    createCategory(name: string): Promise<CategoryInterface>;
    findAllCategories(): Promise<CategoryInterface[]>;
    findCategoryById(categoryId: number): Promise<CategoryInterface>;
}