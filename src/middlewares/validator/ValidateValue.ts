import { NextFunction, Request, Response } from "express";
import { check, validationResult, body } from "express-validator";

export class ValidateValuesMiddleware {
    public async validateLogin(req: Request, res: Response, next: NextFunction) {
        const validationRules = [
            check('email').isEmail().withMessage('Email is not a valid email address'),
            check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
        ];
        await Promise.all(validationRules.map(validation => validation.run(req)));
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errorMessage = errors.array().map(error => ({ message: error.msg }));
            return res.status(400).json({ errors: errorMessage });
        }
        next();
    }

    public async validateRegister(req: Request, res: Response, next: NextFunction) {
        const validationRules = [
            check('name').isLength({ min: 3 }).withMessage('Name must be at least 3 characters'),
            check('email').isEmail().withMessage('Email is not a valid email address'),
            check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
            body('password_confirmation')
                .custom((value, { req }) => value === req.body.password)
                .withMessage('Password does not match')
        ];
        await Promise.all(validationRules.map(validation => validation.run(req)));
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errorMessage = errors.array().map(error => ({ message: error.msg }));
            return res.status(400).json({ errors: errorMessage });
        }
        next();
    }
}