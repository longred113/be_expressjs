export interface CartInterface {
    userId: number
    productId: number
    quantity: number
    productPrice: number
    product: {
        name: string
        price: number
        image: string
    }
}