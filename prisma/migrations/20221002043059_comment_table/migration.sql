-- CreateTable
CREATE TABLE "Comment" (
    "id" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "modifyAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "content" TEXT NOT NULL,
    "chaterId" TEXT,
    "bookId" TEXT,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_chaterId_fkey" FOREIGN KEY ("chaterId") REFERENCES "Chapter"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE SET NULL ON UPDATE CASCADE;
