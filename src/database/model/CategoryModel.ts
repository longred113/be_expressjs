import { AutoIncrement, Column, CreatedAt, DataType, HasMany, Model, PrimaryKey, Table, UpdatedAt } from "sequelize-typescript";
import { ProductModel } from "./ProductModel";
import { ChildCateModel } from "./ChildCateModel";

@Table({
    tableName: 'categories',
    timestamps: true,
})

export class CategoryModel extends Model {

    @HasMany(() => ProductModel)
    products?: ProductModel;
    @HasMany(() => ChildCateModel)
    childCates?: ChildCateModel;

    @Column({
        type: DataType.STRING,
    })
    declare name: string;

    @CreatedAt
    @Column({
        type: DataType.DATE,
    })
    declare created_at: Date;

    @UpdatedAt
    @Column({
        type: DataType.DATE,
    })
    declare updated_at: Date;
}