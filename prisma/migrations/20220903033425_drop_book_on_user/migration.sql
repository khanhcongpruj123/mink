/*
  Warnings:

  - You are about to drop the `UsersOnBooks` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UsersOnBooks" DROP CONSTRAINT "UsersOnBooks_bookId_fkey";

-- DropForeignKey
ALTER TABLE "UsersOnBooks" DROP CONSTRAINT "UsersOnBooks_userId_fkey";

-- DropTable
DROP TABLE "UsersOnBooks";
