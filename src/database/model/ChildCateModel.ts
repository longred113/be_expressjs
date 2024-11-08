import { AutoIncrement, BelongsTo, Column, CreatedAt, DataType, ForeignKey, HasMany, Model, PrimaryKey, Table, UpdatedAt } from "sequelize-typescript";
import { CategoryModel } from "./CategoryModel";

@Table({
    tableName: 'child_categories',
    timestamps: true,
})

export class ChildCateModel extends Model {


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

    @ForeignKey(() => CategoryModel)
    declare categoryId: number;
    @BelongsTo(() => CategoryModel)
    category?: CategoryModel;
}