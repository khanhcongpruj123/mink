/*
  Warnings:

  - You are about to drop the `BooksOnUsers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "BooksOnUsers" DROP CONSTRAINT "BooksOnUsers_bookId_fkey";

-- DropForeignKey
ALTER TABLE "BooksOnUsers" DROP CONSTRAINT "BooksOnUsers_userId_fkey";

-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "thumbnailUrl" TEXT,
ALTER COLUMN "description" DROP NOT NULL;

-- DropTable
DROP TABLE "BooksOnUsers";
