import { PrismaClient } from '@prisma/client';
import User from '../model/user.model';

const prisma = new PrismaClient();

export const save = async (user: User) => {
    await prisma.user.create({
        data: {
            username: user.username,
            password: user.password
        }
    });
};