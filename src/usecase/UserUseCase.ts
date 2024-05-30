import { UserModel } from "../database/model/UserModel";
import { UserInterface } from "../interface/UserInterface";
import { IUserRepository } from "../repository/userRepository";
import { RestError } from "../service/error/error";
import * as bcrypt from 'bcryptjs';
import { decryptPassWordInput, decryptTokenPassword } from "../utils/DecryptPassword";

export class UserUseCase {
    constructor(private userRepository: IUserRepository) { }

    async getAll(): Promise<any> {
        const users = await this.userRepository.findAllLists();
        return users;
    }

    async login(email: string, password: string): Promise<any> {
        let splitUserName = email.split('@');
        let user: UserInterface | null = null;
        if (splitUserName.length > 1) {
            user = await this.userRepository.findByEmail(email);
            if (!user) throw new RestError('account not found!', 404);
        }
        const isPassword = bcrypt.compareSync(password, user!.password);
        if (!isPassword) throw new RestError('password not match!', 404);
        return decryptTokenPassword(user!);
    }

    async register(name: string, email: string, password: string): Promise<UserInterface> {
        console.log(2);
        let checkedUser = await this.userRepository.findByEmail(email);
        if (checkedUser) {
            throw new RestError('Email already be used', 404);
        }
        const user = await this.userRepository.createUser(name, email, decryptPassWordInput(password));
        return user;
    }

    async userProfile(userId: number) {
        const user = await this.userRepository.findById(userId);
        return user
    }
}