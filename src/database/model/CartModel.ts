import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { UserModel } from "./UserModel";
import { ProductModel } from "./ProductModel";
import { Json } from "sequelize/types/utils";

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
        type: DataType.JSON,
    })
    declare cartInfo: JSON;
    @Column({
        type: DataType.JSON,
    })
    declare products: JSON;
}