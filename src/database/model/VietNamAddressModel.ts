import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({
    tableName: 'vietnam_addresses',
    timestamps: false,
})
export class VietNamAddressModel extends Model {
    // @Column({
    //     type: DataType.STRING,
    // })
    // declare Id: String;

    @Column({
        type: DataType.STRING,
    })
    declare Name: String;

    @Column({
        type: DataType.JSON
    })
    declare Districts: JSON
}