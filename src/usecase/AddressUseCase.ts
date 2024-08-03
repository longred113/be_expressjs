import { IAddressRepository } from "../repository/addressRepository";


export class AddressUseCase {
    constructor(private addressRepository: IAddressRepository) { }

    async getAddress(): Promise<any> {
        return await this.addressRepository.findAllVnAddress();
    }
}