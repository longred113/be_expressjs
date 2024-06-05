import { CategoryInterface } from "../interface/CategoryInterface";

export interface ICategoryRepository {
    createCategory(name: string): Promise<CategoryInterface>;
    findAllCategories(): Promise<CategoryInterface[]>;
    findCategoryById(categoryId: number): Promise<CategoryInterface>;
    updateCategory(name: string, categoryId: number): Promise<any>;
    deleteCategory(categoryIds: number[]): Promise<void>;
}