import { RestError } from "../service/error/error";
import { CartUseCase } from "../usecase/CartUseState";
import { SendResponse } from "../service/success/success";
import { Request, Response } from "express";
import { redisController } from "../redis/RedisController";
import { ProductUseCase } from "../usecase/ProductUseCase";

export class CartController {
    constructor(private cartUseCase: CartUseCase, private productUseCase: ProductUseCase) { }

    public createCart = async (req: Request, res: Response) => {
        try {
            const userId = (req as any).user.id;
            const { products, cartInfo } = req.body
            await this.cartUseCase.createCart(userId, products, cartInfo);
            return new SendResponse({ message: "Add to cart successfully!" }).send(res);
        } catch (error) {
            return RestError.manageServerError(res, error, false);
        }
    }

    public getCart = async (req: Request, res: Response) => {
        try {
            const userId = (req as any).user.id;
            const cart = await this.cartUseCase.getCart(userId);
            const carts = cart?.map(item => {
                const price = item.product.price;
                const total = item.quantity * price;
                return {
                    productName: item.product.name,
                    quantity: item.quantity,
                    price: item.product.price,
                    image: item.product.image?.[0] || null,
                    total: total
                }
            })
            return new SendResponse({ data: carts, message: "Get cart successfully!" }).send(res);
        } catch (error) {
            return RestError.manageServerError(res, error, false);
        }
    }

    public addToCart = async (req: Request, res: Response) => {
        try {
            const { productId, quantity } = req.body;
            const key = `cart:${(req as any).user.id}`;
            const field = `productId:${productId}`;
            const increment = quantity;
            const data = await redisController.addToCart({ key, field, increment });
            return new SendResponse({ data: data }).send(res);
        } catch (error) {
            return RestError.manageServerError(res, error, false);
        }
    }

    public getCartUser = async (req: Request, res: Response) => {
        try {
            const key = `cart:${(req as any).user.id}`;
            const value = await redisController.getCart({ key });
            const cartItems = await Promise.all(Object.keys(value).map(async (item) => {
                const [_, productId] = item.split(':');
                const productData = await this.productUseCase.getProductById(parseInt(productId));
                return {
                    productData: productData,
                    quantity: parseInt(value[item], 10),
                }
            }));
            const totalPrice = cartItems.reduce((total, item) => {
                return total + (item.productData!.price * item.quantity!);
            }, 0);
            const responseData = {
                cartItems: cartItems,
                totalPrice: totalPrice
            };
            return new SendResponse({ data: responseData }).send(res);
        } catch (error) {
            return RestError.manageServerError(res, error, false);
        }
    }

    public deleteCart = async (req: Request, res: Response) => {
        try {
            // const productId = req.params.productId;
            const key = `cart:${(req as any).user.id}`;
            await redisController.clearCart(key);
            return new SendResponse({ message: "Delete cart successfully!" }).send(res);
        } catch (error) {
            return RestError.manageServerError(res, error, false);
        }
    }

    public deleteCartItem = async (req: Request, res: Response) => {
        try {
            const productId = req.params.productId;
            const key = `cart:${(req as any).user.id}`;
            await redisController.deleteCartItem(key, productId);
            return new SendResponse({ message: "Delete cart item successfully!" }).send(res);
        } catch (error) {
            return RestError.manageServerError(res, error, false);
        }
    }

    public updateCartQuantity = async (req: Request, res: Response) => {
        try {
            const { productId, quantity, type } = req.body;
            const key = `cart:${(req as any).user.id}`;
            const field = `productId:${productId}`;
            let increment: number;
            if (type === "increment") {
                increment = quantity;
            }
            else if (type === "decrement") {
                increment = -1 * quantity;
            } else {
                increment = 0
            }
            await redisController.addToCart({ key, field, increment });
            return new SendResponse({ message: "Update cart successfully!" }).send(res);
        } catch (error) {
            return RestError.manageServerError(res, error, false);
        }
    }
}