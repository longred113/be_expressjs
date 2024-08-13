export interface CartInterface {
    userId: number
    products: string[]
    cartInfo: string[]
    productId: number
    quantity: number
    productPrice: number
    product: {
        name: string
        price: number
        image: string
    }
}