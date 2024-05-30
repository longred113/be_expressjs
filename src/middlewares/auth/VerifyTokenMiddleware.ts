import { NextFunction, Request, Response } from "express";
import { SendResponse } from "../../service/success/success";
import * as JWT from 'jsonwebtoken';
import { SECRETKEY } from "../../common/common.constants";

export class VerifyTokenMiddleware {
    public authenticate(req: Request, res: Response, next: NextFunction) {
        try {
            const token = req.header('Authorization');
            if (!token) {
                return new SendResponse({
                    status: 'error',
                    code: 401,
                    message: "You do not have sign in!"
                }).send(res);
            }
            const deCode: any = JWT.verify(token as string, SECRETKEY);
            const getTime = Math.round(new Date().getTime() / 1000);
            if (!deCode || (deCode && deCode.exp < getTime)) {
                return new SendResponse({
                    status: 'error',
                    code: 401,
                    message: "Token expired, please login again!"
                }).send(res);
            }
            (req as any).user = deCode;
            return next();
        } catch (error) {
            return new SendResponse({
                status: 'error',
                code: 401,
                message: "Token expired, please login again!"
            }).send(res);
        }
    }

    public permissionsRoleAdmin(req: Request, res: Response, next: NextFunction) {

    }
}