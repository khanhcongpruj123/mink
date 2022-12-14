import { PrismaClient, UserProfile } from "@prisma/client";

const prisma = new PrismaClient();

export const createDefaultUserProfile = async (userId: string) => {
  return await prisma.userProfile.create({
    data: {
      firstName: "",
      lastName: "",
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
};

export const getByUserId = (userId: string) => {
  return prisma.userProfile.findUnique({
    where: {
      userId: userId,
    },
  });
};

export const update = (userProfile: UserProfile) => {
  return prisma.userProfile.update({
    where: {
      id: userProfile.id,
    },
    data: userProfile,
  });
};
