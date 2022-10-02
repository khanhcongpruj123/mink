import { InvalidCommentContent } from "@core/error";
import { PrismaClient, Comment } from "@prisma/client";

const prisma = new PrismaClient();

export const addBookComment = (
  userId: string,
  bookId: string,
  content: string
) => {
  // validate comment
  if (!content || content.length == 0) {
    throw InvalidCommentContent;
  }
  return prisma.comment.create({
    data: {
      content: content,
      ownerId: userId,
      bookId: bookId,
    },
  });
};

export const getBookComments = (
  bookId: string,
  page?: number,
  pageSize?: number
) => {
  return prisma.comment.findMany({
    skip: page && pageSize ? page * pageSize : undefined,
    take: pageSize,
    where: {
      bookId: bookId,
    },
    orderBy: {
      createAt: "desc",
    },
  });
};

const updateContent = (ownerId: string, id: string, content: string) => {
  if (!content || content.length == 0) {
    throw InvalidCommentContent;
  }
  return prisma.comment.updateMany({
    where: {
      id: id,
      ownerId: ownerId,
    },
    data: {
      content: content,
    },
  });
};
