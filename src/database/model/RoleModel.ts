import { Column, CreatedAt, DataType, HasMany, Model, PrimaryKey, AutoIncrement, Table, UpdatedAt } from "sequelize-typescript";
import { UserModel } from "./UserModel";

@Table({
    tableName: 'roles',
    timestamps: true
})
export class RoleModel extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER,
    })
    declare id: number;

    @HasMany(() => UserModel)
    users?: UserModel;

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
