import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { UserModel } from "./UserModel";
import { ProductModel } from "./ProductModel";

@Table({
    tableName: 'carts',
    timestamps: true,
})
export class CartModel extends Model {
    @Column({
        type: DataType.INTEGER,
    })
    @ForeignKey(() => UserModel)
    declare userId: number;

    @BelongsTo(() => UserModel)
    user?: UserModel;

    @Column({
        type: DataType.INTEGER
    })
    @ForeignKey(() => ProductModel)
    declare productId: number;

    @BelongsTo(() => ProductModel)
    product?: ProductModel;

    @Column({
        type: DataType.INTEGER,
    })
    declare quantity: number;
}