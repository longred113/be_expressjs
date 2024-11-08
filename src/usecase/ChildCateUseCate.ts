import { ChildCateInterface } from "../interface/ChildCateInterface";
import { IChildCateRepository } from "../repository/childCateRepository";

export class ChildCateUseCase {
    constructor(private childCateRepository: IChildCateRepository) {
    }
    async createChildCate(reqBody: any): Promise<ChildCateInterface> {
        return await this.childCateRepository.createChildCate(reqBody);
    }
}