import { PrismaClient } from '@prisma/client';
import User from '../model/user.model';

const prisma = new PrismaClient();

export const save = async (user: User) => {
    return await prisma.user.create({
        data: {
            username: user.username,
            password: user.password
        }
    });
};

export const findByUsername = async (username: string) => {
    return await prisma.user.findUnique({
        where: {
            username: username
        }
    });
};