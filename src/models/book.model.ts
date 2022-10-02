import { Book as BookEntity, User } from "@prisma/client";

export type Book = BookEntity & {
  authors: User;
};
