import { LoginSessionInfo, RequestWithUser } from "@models/auth.model";
import { LoginSession, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const create = (
  name: string,
  description: string | undefined,
  thumbnailUrl: string | undefined,
  ownerId: string
) => {
  return prisma.book.create({
    data: {
      name: name,
      description: description,
      thumbnailUrl: thumbnailUrl,
      slug: extractToSlug(name),
      owner: {
        connect: {
          id: ownerId,
        },
      },
    },
  });
};

export const getBySlug = (slug: string) => {
  return prisma.book.findUnique({
    where: {
      slug: slug,
    },
  });
};

export const getById = (id: string) => {
  return prisma.book.findUnique({
    where: {
      id: id,
    },
  });
};

export const getByUserId = async (userId: string) => {
  return prisma.book.findMany({
    where: {
      ownerId: userId,
    },
  });
};

export const extractToSlug = (name: string) => {
  return name
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ /g, "_");
};

export const getByUserIdAndBookId = (userId: string, bookId: string) => {
  return prisma.book.findMany({
    where: {
      id: bookId,
      AND: {
        ownerId: userId,
      },
    },
  });
};

export const findByKeyword = (
  keyword: string,
  page: number | undefined,
  pageSize: number | undefined
) => {
  return prisma.book.findMany({
    skip: page ? page * pageSize : undefined,
    take: pageSize,
    where: {
      slug: {
        contains: extractToSlug(keyword),
      },
    },
    orderBy: {
      createAt: "desc",
    },
  });
};

export const isOwner = async (user: LoginSessionInfo, bookId: string) => {
  return prisma.book
    .findUnique({
      where: {
        id: bookId,
      },
    })
    .then((book) => {
      return book.ownerId == user.id;
    });
};
