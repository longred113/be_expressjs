import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { UserModel } from "./UserModel";

@Table({
    tableName: 'user_info',
    timestamps: true,
})

export class UserInfoModel extends Model {
    @Column({
        type: DataType.STRING,
    })
    declare address: string;

    @Column({
        type: DataType.STRING,
    })
    declare phone: string;
    @Column({
        type: DataType.STRING,
    })
    declare city: string;
    @Column({
        type: DataType.STRING,
    })
    declare district: string;
    @Column({
        type: DataType.STRING,
    })
    declare ward: string;

    @Column({
        type: DataType.INTEGER,
    })
    @ForeignKey(() => UserModel)
    declare userId: number;
    @BelongsTo(() => UserModel)
    user?: UserModel;
}