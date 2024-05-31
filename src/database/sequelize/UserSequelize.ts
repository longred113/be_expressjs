import { Transaction } from "sequelize";
import { UserInterface } from "../../interface/UserInterface";
import { IUserRepository } from "../../repository/userRepository";
import { UserModel } from "../model/UserModel";
import { RoleModel } from "../model/RoleModel";

export class UserSequelize implements IUserRepository {

    async findAllLists(): Promise<UserInterface[]> {
        const users = await UserModel.findAll({
            attributes: { exclude: ['password', 'remember_token'] },
            include: [{
                model: RoleModel,
                as: 'role',
                attributes: ['name']
            }]
        });
        return users;
    }

    async findByEmail(email: string): Promise<any> {
        const user = await UserModel.findOne({
            where: { email }
        });
        return user;
    }

    async createUser(name: string, email: string, password: string): Promise<any> {
        try {
            const user = await UserModel.create({ name, email, password, roleId: 2, attributes: { exclude: ['password', 'remember_token'] } });
            return user;
        } catch (error) {
            console.log(error);
        }
    }

    async findById(userId: number): Promise<any> {
        const user = await UserModel.findByPk(userId, { attributes: { exclude: ['password'] } });
        return user;
    }

}