import { CartInterface } from "../interface/CartInterface";

export interface ICartRepository {
    createCart(userId: number, products: JSON, quantity: JSON): Promise<CartInterface>;
    getCart(userId: number): Promise<CartInterface[] | null>;
    getCartIsExist(userId: number, productId: number): Promise<any>;
    updateCart(userId: number, productId: number, quantity: number): Promise<any>;
}