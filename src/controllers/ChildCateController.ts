import { RestError } from "../service/error/error";
import { SendResponse } from "../service/success/success";
import { ChildCateUseCase } from "../usecase/ChildCateUseCate";
import { Request, Response } from "express";

export class ChildCateController {
    constructor(private childCateUseCase: ChildCateUseCase) { }

    public createChildCate = async (req: Request, res: Response) => {
        try {
            const childCate = await this.childCateUseCase.createChildCate(req.body);
            return new SendResponse({ data: childCate, message: "Create new child category successfully" }).send(res);
        } catch (error) {
            return RestError.manageServerError(res, error, false);
        }
    }
}