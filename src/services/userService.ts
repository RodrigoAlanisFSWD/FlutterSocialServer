import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import prisma from '../prisma';

class UserService {

    async createUser(body: any) {
        const { username, email, password } = body;

        const hashedPassword = await bcrypt.hash(password, 5)

        const user = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
            }
        })

        return user;
    }

    async findUserFromEmail(email: string) {
        const user = await prisma.user.findUnique({
            where: {
                email,
            }
        })

        return user;
    }

    async comparePasswords(user: User, password: string) {
        const verify = await bcrypt.compare(password, user.password);

        return verify;
    }

    generateTokensFromUser(user: User) {
        const token = jwt.sign({ id: user.id }, "secret_key", {
            expiresIn: 60 * 60 * 1,
        })

        const refresh = jwt.sign({ id: user.id }, "refresh_secret_key", {
            expiresIn: 60 * 60 * 48
        })

        return {
            token,
            refresh
        }
    }

    async verifyRefresh(refresh: string) {
        const verify = jwt.verify(refresh, "refresh_secret_key");

        if (verify) {
            return jwt.decode(refresh);
        }

        return null;
    }

}

export default new UserService();