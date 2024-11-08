import { ChildCateInterface } from "../../interface/ChildCateInterface";
import { IChildCateRepository } from "../../repository/childCateRepository";
import { ChildCateModel } from "../model/ChildCateModel";

export class ChildCateSequelize implements IChildCateRepository {

    async createChildCate(reqBody: any): Promise<ChildCateInterface> {
        const childCate = await ChildCateModel.create(reqBody);
        return childCate;
    }
}