/*
  Warnings:

  - You are about to drop the `BooksOnUsers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_BookToUser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `ownerId` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "BooksOnUsers" DROP CONSTRAINT "BooksOnUsers_bookId_fkey";

-- DropForeignKey
ALTER TABLE "BooksOnUsers" DROP CONSTRAINT "BooksOnUsers_userId_fkey";

-- DropForeignKey
ALTER TABLE "_BookToUser" DROP CONSTRAINT "_BookToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_BookToUser" DROP CONSTRAINT "_BookToUser_B_fkey";

-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "ownerId" TEXT NOT NULL;

-- DropTable
DROP TABLE "BooksOnUsers";

-- DropTable
DROP TABLE "_BookToUser";

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
