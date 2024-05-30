import { Router } from 'express';
import { UserController } from '../../controllers/UserController';
import { UserSequelize } from '../../database/sequelize/UserSequelize';
import { IUserRepository } from '../../repository/userRepository';
import { UserUseCase } from '../../usecase/UserUseCase';
import { VerifyTokenMiddleware } from '../../middlewares/auth/VerifyTokenMiddleware';
import { ValidateValuesMiddleware } from '../../middlewares/validator/ValidateValue';

const BASE_ROUTE = '/user';

enum Routes {
    GET_ALL = '/get-all',
    LOGIN = '/login',
    REGISTER = '/register',
    PROFILE = '/profile',
}

export class UsersRouter {
    private userSequelize: UserSequelize = new UserSequelize();
    private userUseCase: UserUseCase = new UserUseCase(this.userSequelize)
    private userController: UserController = new UserController(this.userUseCase);
    private verifyTokenMiddleware: VerifyTokenMiddleware = new VerifyTokenMiddleware();
    private validateValue: ValidateValuesMiddleware = new ValidateValuesMiddleware();
    public router(app: Router): void {
        app.post(BASE_ROUTE + Routes.REGISTER, this.validateValue.validateRegister, this.userController.register);
        app.post(BASE_ROUTE + Routes.LOGIN, this.validateValue.validateLogin, this.userController.login);
        app.get(BASE_ROUTE + Routes.GET_ALL, this.verifyTokenMiddleware.authenticate, this.userController.getAllUser);
        app.get(BASE_ROUTE + Routes.PROFILE, this.verifyTokenMiddleware.authenticate, this.userController.userProfile);
    }
}