import { AllowNull, BelongsTo, Column, CreatedAt, DataType, ForeignKey, HasMany, Model, Table, UpdatedAt } from "sequelize-typescript";
import { Col } from "sequelize/types/utils";
import { CategoryModel } from "./CategoryModel";
import { CartModel } from "./CartModel";

@Table({
    tableName: 'products',
    timestamps: true
})

export class ProductModel extends Model {
    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false,
    })
    declare name: string

    @Column({
        type: DataType.JSON
    })
    declare description: JSON

    @Column({
        type: DataType.INTEGER
    })
    declare price: number

    @Column({
        type: DataType.INTEGER
    })
    declare inventory_number: number

    @Column({
        type: DataType.STRING
    })
    declare producer: string

    @Column({
        type: DataType.JSON
    })
    declare image: JSON

    @Column({
        type: DataType.INTEGER

    })
    @ForeignKey(() => CategoryModel)
    declare categoryId: number;
    @BelongsTo(() => CategoryModel)
    category?: CategoryModel;
}