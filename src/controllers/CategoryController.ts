import { Request, Response } from "express";
import { RestError } from "../service/error/error";
import { CategoryUseCase } from "../usecase/CategoryUseCase";
import { SendResponse } from "../service/success/success";

export class CategoryController {
    constructor(private CategoryUseCase: CategoryUseCase) { }

    public findAllCategory = async (req: Request, res: Response) => {
        try {
            const categories = await this.CategoryUseCase.findAllCategories();
            return new SendResponse({ data: categories, message: "All categories" }).send(res);
        } catch (error) {
            return RestError.manageServerError(res, error, false);
        }
    }

    public createCategory = async (req: Request, res: Response) => {
        try {
            const { name } = req.body;
            const newCategory = await this.CategoryUseCase.createCategory(name);
            return new SendResponse({ data: newCategory, message: "Create new category successfully" }).send(res);
        } catch (error) {
            return RestError.manageServerError(res, error, false);
        }
    }

    public findCategoryById = async (req: Request, res: Response) => {
        try {
            const { categoryId } = req.params;
            const category = await this.CategoryUseCase.findCategoryById(parseInt(categoryId, 10));
            return new SendResponse({ data: category, message: "Find category successfully" }).send(res);
        } catch (error) {
            return RestError.manageServerError(res, error, false);
        }
    }

    public updateCategory = async (req: Request, res: Response) => {
        try {
            const { categoryId } = req.params;
            const { name } = req.body;
            const data = await this.CategoryUseCase.adminUpdateCategory(name, parseInt(categoryId, 10));
            if (data[0] === 0) {
                return new SendResponse({ message: "Category not found", code: 404, status: "error" }).send(res);
            }
            return new SendResponse({ message: "Update category successfully" }).send(res);
        } catch (error) {
            return RestError.manageServerError(res, error, false);
        }
    }

    public deleteCategory = async (req: Request, res: Response) => {
        try {
            const { categoryIds } = req.body;
            await this.CategoryUseCase.deleteCategory(categoryIds);
            return new SendResponse({ message: "Delete category successfully" }).send(res);
        } catch (error) {
            return RestError.manageServerError(res, error, false);
        }
    }
}