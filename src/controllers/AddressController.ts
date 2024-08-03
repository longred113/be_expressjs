import { RestError } from "../service/error/error";
import { SendResponse } from "../service/success/success";
import { AddressUseCase } from "../usecase/AddressUseCase";
import { Request, Response } from "express";
export class AddressController {
    constructor(private addressUseCase: AddressUseCase) { }

    public getAll = async (req: Request, res: Response) => {
        try {
            const addresses = await this.addressUseCase.getAddress();
            return new SendResponse({ data: addresses, message: "All Address" }).send(res);
        } catch (error) {
            return RestError.manageServerError(res, error, false);
        }
    }
}