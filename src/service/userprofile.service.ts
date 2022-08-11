import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

export const createDefaultUserProfile = async (userId: number) => {
    return await prisma.userProfile.create({
        data: {
            firstName: "",
            lastName: "",
            user: {
                connect: {
                    id: userId
                }
            }
        }
    });
};
