import { PrismaClient, User } from '@prisma/client';
import * as uuid from 'uuid';

const prisma = new PrismaClient();

export const create = (user: User) => {
    return prisma.loginSession.create({
        data: {
            id: uuid.v4(),
            user: {
                connect: {
                    id: user.id
                }
            }
        }
    });
};

export const getById = (id: string) => {
    return prisma.loginSession.findUnique({
        where: {
            id: id
        }
    });
};

export const deleteById = (id: string) => {
    return prisma.loginSession.delete({
        where: {
            id: id
        }
    });
};