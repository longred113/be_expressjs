import { UserInterface } from "../interface/UserInterface";
import * as JWT from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import { SECRETKEY } from "../common/common.constants";

export const decryptTokenPassword = (user: any) => {
    const header = {
        id: user.id,
        name: user.name,
        email: user.email,
        // roleId: user.roleId,
    };
    const token = JWT.sign(header, SECRETKEY, { expiresIn: 86400 });
    const response = {
        name: user.name,
        email: user.email,
        token
    };
    return response;
}

export const decryptPassWordInput = (passWord: string) => {
    const salt = bcrypt.genSaltSync(10);
    const hashPassWord = bcrypt.hashSync(passWord, salt);
    return hashPassWord;
};
