import { Request, Response } from 'express';
import { UserUseCase } from '../usecase/UserUseCase';
import { SendResponse } from '../service/success/success';
import { RestError } from '../service/error/error';

export class UserController {

    constructor(private userUseCase: UserUseCase) { }
    public getAllUser = async (req: Request, res: Response) => {
        try {
            const users = await this.userUseCase.getAll();
            return new SendResponse({ data: users }).send(res);
        } catch (error) {
            return RestError.manageServerError(res, error, false);
        }
    }

    public login = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;
            const user = await this.userUseCase.login(email, password);
            return new SendResponse({ data: user, message: "Login Successfully!" }).send(res);
        } catch (error) {
            return RestError.manageServerError(res, error, false);
        }
    }

    public register = async (req: Request, res: Response) => {
        try {
            const { name, email, password } = req.body;
            const user = await this.userUseCase.register(name, email, password);
            return new SendResponse({ data: user, message: "User register successfully!" }).send(res);
        } catch (error) {
            return RestError.manageServerError(res, error, false);
        }
    }

    public userProfile = async (req: Request, res: Response) => {
        try {
            const userId = (req as any).user.id;
            const userInfo = await this.userUseCase.userProfile(userId);
            return new SendResponse({ data: userInfo, message: "User profile" }).send(res);
        } catch (error) {
            return RestError.manageServerError(res, error, false);
        }
    }

    public userLogout = async (req: Request, res: Response) => {
        try {
            const userId = (req as any).user.id;
            // await this.userUseCase.userLogout(userId);
        } catch (error) {
            return RestError.manageServerError(res, error, false);
        }
    }
}