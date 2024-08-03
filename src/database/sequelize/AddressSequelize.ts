import { IAddressRepository } from "../../repository/addressRepository";
import { VietNamAddressModel } from "../model/VietNamAddressModel";

export class AddressSequelize implements IAddressRepository {
    async findAllVnAddress(): Promise<any> {
        return await VietNamAddressModel.findAll();
    }
}