-- CreateTable
CREATE TABLE "LoginSession" (
    "id" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "LoginSession_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LoginSession_userId_key" ON "LoginSession"("userId");

-- AddForeignKey
ALTER TABLE "LoginSession" ADD CONSTRAINT "LoginSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
