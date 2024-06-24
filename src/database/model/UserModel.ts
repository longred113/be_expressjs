import { AllowNull, AutoIncrement, BelongsTo, Column, CreatedAt, DataType, ForeignKey, HasMany, Model, PrimaryKey, Table, UpdatedAt } from "sequelize-typescript";
import { RoleModel } from "./RoleModel";
import { CartModel } from "./CartModel";


@Table({
    tableName: 'users',
    timestamps: true,
})
export class UserModel extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER,
    })
    declare id: number;

    @Column({
        type: DataType.STRING,
    })
    declare name: string;

    @Column({
        type: DataType.STRING,
    })
    declare email: string;

    @Column({
        type: DataType.STRING,
        unique: true,
    })
    declare password: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    declare remember_token: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: true
    })
    @ForeignKey(() => RoleModel)
    declare roleId: number;

    @BelongsTo(() => RoleModel)
    role?: RoleModel;

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

    @HasMany(() => CartModel)
    carts?: CartModel;
}
