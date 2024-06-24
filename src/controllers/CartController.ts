import { RestError } from "../service/error/error";
import { CartUseCase } from "../usecase/CartUseState";
import { SendResponse } from "../service/success/success";
import { Request, Response } from "express";

export class CartController {
    constructor(private cartUseCase: CartUseCase) { }

    public createCart = async (req: Request, res: Response) => {
        try {
            const { userId, productId, quantity } = req.body
            await this.cartUseCase.createCart(userId, productId, quantity);
            return new SendResponse({ message: "Add to cart successfully!" }).send(res);
        } catch (error) {
            return RestError.manageServerError(res, error, false);
        }
    }

    public getCart = async (req: Request, res: Response) => {
        try {
            const userId = (req as any).user.id;
            const cart = await this.cartUseCase.getCart(userId);
            return new SendResponse({ data: cart, message: "Get cart successfully!" }).send(res);
        } catch (error) {
            return RestError.manageServerError(res, error, false);
        }
    }
}