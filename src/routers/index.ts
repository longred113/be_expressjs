import { RoleRouter } from "./users/RoleRouter";
import { UsersRouter } from "./users/UserRouter";
import { Router } from 'express';


export class Routes {
    public usersRouter: UsersRouter = new UsersRouter();
    public roleRouter: RoleRouter = new RoleRouter();

    public routes(app: Router): Router {
        this.usersRouter.router(app);
        this.roleRouter.router(app);
        return Router();
    }
}