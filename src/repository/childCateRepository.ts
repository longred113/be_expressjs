import { ChildCateInterface } from "../interface/ChildCateInterface";


export interface IChildCateRepository {
    createChildCate(reqBody: string): Promise<ChildCateInterface>;
}