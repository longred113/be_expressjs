import { CartInterface } from "../interface/CartInterface";
import { ICartRepository } from "../repository/cartRepository";

export class CartUseCase {
    constructor(private cartRepository: ICartRepository) { }

    async createCart(userId: number, productId: number, quantity: number): Promise<CartInterface> {
        const cart = await this.cartRepository.getCartIsExist(userId, productId);
        if (cart) {
            return await this.cartRepository.updateCart(userId, productId, quantity + cart.quantity);
        } else {
            return await this.cartRepository.createCart(userId, productId, quantity);
        }
    }

    async getCart(userId: number): Promise<CartInterface[] | null> {
        return await this.cartRepository.getCart(userId);
    }
}