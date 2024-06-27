import { promises } from "dns";
import { CartInterface } from "../../interface/CartInterface";
import { ICartRepository } from "../../repository/cartRepository";
import { CartModel } from "../model/CartModel";
import { ProductModel } from "../model/ProductModel";

export class CartSequelize implements ICartRepository {
    async createCart(userId: number, productId: number, quantity: number): Promise<any> {
        return await CartModel.create({ userId, productId, quantity });
    }

    async getCart(userId: number): Promise<any | null> {
        const cart = await CartModel.findAll({
            where: { userId },
            include: [{
                model: ProductModel,
                as: 'product',
                attributes: ['name', 'price']
            }],
            attributes: ['quantity']
        });
        return cart;
    }

    async getCartIsExist(userId: number, productId: number): Promise<any> {
        const cart = await CartModel.findOne({ where: { userId, productId } });
        return cart;
    }

    async updateCart(userId: number, productId: number, quantity: number) {
        return await CartModel.update({ quantity }, { where: { userId, productId } });
    }
}