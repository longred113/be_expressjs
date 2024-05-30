import { UserInterface } from "../interface/UserInterface";
import { Transaction } from 'sequelize';

export interface IUserRepository {
    findAllLists(): Promise<UserInterface[]>
    findByEmail(email: string): Promise<UserInterface>
    createUser(name: string, email: string, password: string): Promise<UserInterface>
    findById(userId: number): Promise<any>
}